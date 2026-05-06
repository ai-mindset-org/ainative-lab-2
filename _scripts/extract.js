#!/usr/bin/env node
/**
 * AI Native Lab — Knowledge Graph Data Extractor
 *
 * Parses Obsidian vault to generate graph.json for the 3D visualization.
 * Extracts wikilinks, frontmatter tags, file relationships, and semantic zones.
 *
 * Usage:
 *   node extract.js [vault-path] [output-path]
 *   node extract.js /path/to/vault data/graph.json
 *
 * Default vault: ~/Library/CloudStorage/Dropbox/notes/AI mindset {shared}/ai-mindset-2026/
 * Default output: data/graph.json
 */

const fs = require('fs');
const path = require('path');

// ── Config ──────────────────────────────────────────
const DEFAULT_VAULT = path.join(
  process.env.HOME,
  'Library/CloudStorage/Dropbox/notes/AI mindset {shared}/ai-mindset-2026'
);
const DEFAULT_OUTPUT = path.join(__dirname, 'data', 'graph.json');

const VAULT_PATH = process.argv[2] || DEFAULT_VAULT;
const OUTPUT_PATH = process.argv[3] || DEFAULT_OUTPUT;

// Colors matching the visualization
const TYPE_COLORS = {
  rule:       '#8b5cf6',
  prd:        '#3b82f6',
  research:   '#10b981',
  meeting:    '#f59e0b',
  transcript: '#f59e0b',
  process:    '#ec4899',
  role:       '#f43f5e',
  skill:      '#4dc9d4',
  tool:       '#6366f1',
  overview:   '#10b981',
  analysis:   '#3b82f6',
  draft:      '#94a3b8',
  default:    '#64748b',
};

// Folders → semantic zones
const FOLDER_ZONES = {
  'aim-rules':            'Rules & Standards',
  'Labs':                 'Lab Cohorts',
  'Org/HR':               'Team & Roles',
  'Org/Partners':         'Partnerships',
  'Org/Processes':        'Processes',
  'Org/Marketing':        'Marketing',
  'Org/Infrastructure':   'Infrastructure',
  'Products Ecosystem':   'Products',
  'meetings':             'Meetings',
  'inbox':                'Research & Analysis',
  'aim context':          'AI Context',
  'aim-guides':           'Guides',
};

// ── Helpers ──────────────────────────────────────────

function walkDir(dir, files = []) {
  if (!fs.existsSync(dir)) return files;
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.name.startsWith('.') || entry.name.startsWith('_')) continue;
    if (entry.isDirectory()) {
      walkDir(fullPath, files);
    } else if (entry.name.endsWith('.md')) {
      files.push(fullPath);
    }
  }
  return files;
}

function extractFrontmatter(content) {
  const match = content.match(/^---\n([\s\S]*?)\n---/);
  if (!match) return {};
  const fm = {};
  match[1].split('\n').forEach(line => {
    const [key, ...rest] = line.split(':');
    if (key && rest.length) {
      fm[key.trim()] = rest.join(':').trim().replace(/^["']|["']$/g, '');
    }
  });
  return fm;
}

function extractWikilinks(content) {
  const links = [];
  const regex = /\[\[([^\]|]+)(?:\|[^\]]+)?\]\]/g;
  let match;
  while ((match = regex.exec(content)) !== null) {
    links.push(match[1].trim());
  }
  return [...new Set(links)];
}

function extractType(filename) {
  const typeMatch = filename.match(/\{(\w+)\}/);
  return typeMatch ? typeMatch[1].toLowerCase() : 'default';
}

function getRelativePath(filePath) {
  return path.relative(VAULT_PATH, filePath);
}

function getFolderZone(relPath) {
  for (const [folder, zone] of Object.entries(FOLDER_ZONES)) {
    if (relPath.startsWith(folder)) return zone;
  }
  return 'Other';
}

function slugify(str) {
  return str.toLowerCase()
    .replace(/[^a-z0-9а-яё]+/gi, '-')
    .replace(/^-|-$/g, '')
    .slice(0, 60);
}

// ── Main ──────────────────────────────────────────

function extract() {
  console.log(`\n  Scanning vault: ${VAULT_PATH}`);
  console.log(`  Output: ${OUTPUT_PATH}\n`);

  const files = walkDir(VAULT_PATH);
  console.log(`  Found ${files.length} markdown files\n`);

  const nodes = [];
  const links = [];
  const nodeMap = new Map(); // filename → node id
  const zoneNodes = new Map(); // zone name → node id

  // Phase 1: Create nodes for each file
  files.forEach((filePath, idx) => {
    const relPath = getRelativePath(filePath);
    const filename = path.basename(filePath, '.md');
    const content = fs.readFileSync(filePath, 'utf-8');
    const fm = extractFrontmatter(content);
    const type = extractType(filename);
    const zone = getFolderZone(relPath);
    // Include parent folder in slug to avoid duplicates (e.g. multiple AGENTS.md)
    const parentFolder = path.basename(path.dirname(filePath));
    let id = slugify(filename) || `node-${idx}`;
    // Deduplicate: if ID already seen, prepend parent folder
    if (nodes.some(n => n.id === id)) {
      id = slugify(parentFolder + '-' + filename) || `node-${idx}`;
    }
    // Final fallback: append index
    if (nodes.some(n => n.id === id)) {
      id = id + '-' + idx;
    }

    // Extract first paragraph as description
    const bodyStart = content.indexOf('---', 4);
    const body = bodyStart > 0 ? content.slice(bodyStart + 3).trim() : content;
    const firstPara = body.split('\n\n')[0]?.replace(/^#+\s.*\n?/, '').trim().slice(0, 200);

    const node = {
      id,
      name: filename.replace(/\{[^}]+\}\s*/g, '').replace(/\s*–\s*\d{4}-\d{2}-\d{2}$/, '').trim(),
      type: type,
      group: Object.keys(FOLDER_ZONES).findIndex(f => relPath.startsWith(f)),
      description: firstPara || '',
      path: relPath,
      zone: zone,
      tags: fm.tags ? fm.tags.split(',').map(t => t.trim()) : [],
      date: filename.match(/(\d{4}-\d{2}-\d{2})/)?.[1] || '',
      linkCount: 0,
    };

    nodes.push(node);
    nodeMap.set(filename, id);
    // Also map without type prefix
    const cleanName = filename.replace(/\{[^}]+\}\s*/g, '').trim();
    if (cleanName !== filename) nodeMap.set(cleanName, id);
  });

  // Create zone nodes
  const zones = [...new Set(nodes.map(n => n.zone))];
  zones.forEach((zone, idx) => {
    const zoneId = 'zone-' + slugify(zone);
    zoneNodes.set(zone, zoneId);
    nodes.push({
      id: zoneId,
      name: zone,
      type: 'zone',
      group: 100 + idx,
      description: `Semantic zone: ${zone}. Contains ${nodes.filter(n => n.zone === zone).length} documents.`,
      isZone: true
    });
  });

  // Phase 2: Create links from wikilinks
  files.forEach(filePath => {
    const filename = path.basename(filePath, '.md');
    const content = fs.readFileSync(filePath, 'utf-8');
    const wikilinks = extractWikilinks(content);
    const sourceId = nodeMap.get(filename);
    if (!sourceId) return;

    wikilinks.forEach(link => {
      const targetId = nodeMap.get(link);
      if (targetId && targetId !== sourceId) {
        links.push({
          source: sourceId,
          target: targetId,
          type: 'references'
        });
        // Increment link counts
        const sNode = nodes.find(n => n.id === sourceId);
        const tNode = nodes.find(n => n.id === targetId);
        if (sNode) sNode.linkCount++;
        if (tNode) tNode.linkCount++;
      }
    });

    // Link to zone
    const relPath = getRelativePath(filePath);
    const zone = getFolderZone(relPath);
    const zoneId = zoneNodes.get(zone);
    if (zoneId && sourceId) {
      links.push({
        source: sourceId,
        target: zoneId,
        type: 'belongs_to'
      });
    }
  });

  // Phase 3: Remove orphan nodes (optional — keep only connected)
  const connectedIds = new Set();
  links.forEach(l => {
    connectedIds.add(l.source);
    connectedIds.add(l.target);
  });

  // Keep all zone nodes + connected nodes
  const filteredNodes = nodes.filter(n => n.isZone || connectedIds.has(n.id));
  const filteredNodeIds = new Set(filteredNodes.map(n => n.id));
  const filteredLinks = links.filter(l => filteredNodeIds.has(l.source) && filteredNodeIds.has(l.target));

  // Deduplicate links
  const linkSet = new Set();
  const dedupLinks = filteredLinks.filter(l => {
    const key = `${l.source}→${l.target}`;
    if (linkSet.has(key)) return false;
    linkSet.add(key);
    return true;
  });

  const graphData = {
    nodes: filteredNodes,
    links: dedupLinks,
    meta: {
      vault: VAULT_PATH,
      generated: new Date().toISOString(),
      totalFiles: files.length,
      nodesKept: filteredNodes.length,
      linksCreated: dedupLinks.length,
      zones: zones.length
    }
  };

  // Ensure output dir
  const outDir = path.dirname(OUTPUT_PATH);
  if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });

  fs.writeFileSync(OUTPUT_PATH, JSON.stringify(graphData, null, 2));

  console.log(`  Nodes: ${filteredNodes.length} (${nodes.length - filteredNodes.length} orphans removed)`);
  console.log(`  Links: ${dedupLinks.length}`);
  console.log(`  Zones: ${zones.length}`);
  console.log(`\n  Written to: ${OUTPUT_PATH}\n`);

  // Print top nodes by connections
  const topNodes = [...filteredNodes]
    .filter(n => !n.isZone)
    .sort((a, b) => (b.linkCount || 0) - (a.linkCount || 0))
    .slice(0, 15);

  if (topNodes.length) {
    console.log('  Top connected nodes:');
    topNodes.forEach((n, i) => {
      console.log(`    ${i + 1}. [${n.type}] ${n.name} — ${n.linkCount} links`);
    });
    console.log('');
  }
}

try {
  extract();
} catch (err) {
  console.error('Error:', err.message);
  process.exit(1);
}
