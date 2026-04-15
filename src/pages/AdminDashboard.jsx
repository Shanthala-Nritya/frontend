import { useEffect, useMemo, useState } from 'react'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import { apiFetch, clearAuthToken, getAuthHeaders, getAuthToken } from '../lib/api'
import { siteAssets } from '../siteAssets'

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,300;1,400&family=Cinzel:wght@400;500&display=swap');

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  .ad-shell {
    --crimson: #8B1A2B;
    --crimson-dark: #6B1020;
    --crimson-light: #C4294A;
    --gold: #C9973A;
    --gold-light: #E8B84B;
    --gold-pale: #F5E6C8;
    --cream: #FDF6EE;
    --cream-dark: #F5EAD8;
    --text-dark: #2C1810;
    --text-mid: #5C3D2E;
    --text-light: #9C7B6E;
    --white: #FFFFFF;
  }

  .ad-shell {
    min-height: 100vh;
    display: grid;
    grid-template-columns: 256px minmax(0, 1fr);
    background: var(--cream-dark);
    font-family: 'Cormorant Garamond', serif;
    color: var(--text-dark);
  }

  /* ── Sidebar ── */
  .ad-sidebar {
    min-height: 100vh;
    position: sticky;
    top: 0;
    background: var(--crimson-dark);
    color: var(--cream);
    padding: 1.75rem 1.5rem 1.5rem;
    display: flex;
    flex-direction: column;
  }
  .ad-sidebar-brand {
    display: flex;
    align-items: center;
    gap: 0.85rem;
    padding-bottom: 1.6rem;
    border-bottom: 1px solid var(--gold);
    margin-bottom: 2rem;
  }
  .ad-sidebar-logo {
    width: 46px; height: 46px;
    border-radius: 50%;
    background: var(--white);
    object-fit: contain;
    padding: 0.3rem;
  }
  .ad-sidebar-brand-name {
    font-family: 'Cinzel', serif;
    font-size: 0.8rem;
    color: var(--white);
    line-height: 1.2;
  }
  .ad-sidebar-brand-sub {
    color: var(--gold-pale);
    font-size: 0.72rem;
    margin-top: 0.15rem;
  }

  .ad-sidebar-section-label {
    font-family: 'Cinzel', serif;
    font-size: 0.55rem;
    letter-spacing: 0.32em;
    text-transform: uppercase;
    color: var(--gold-pale);
    margin-bottom: 0.6rem;
  }
  .ad-sidebar-nav {
    display: flex;
    flex-direction: column;
    gap: 0.18rem;
    margin-bottom: auto;
  }
  .ad-nav-btn {
    width: 100%;
    display: flex;
    align-items: center;
    gap: 0.85rem;
    padding: 0.78rem 0.9rem;
    border: none;
    background: transparent;
    border-radius: 3px;
    color: var(--gold-pale);
    cursor: pointer;
    text-align: left;
    transition: background 0.18s, color 0.18s;
    font-family: 'Cormorant Garamond', serif;
    font-size: 0.86rem;
  }
  .ad-nav-btn:hover { background: var(--crimson); color: var(--white); }
  .ad-nav-btn.active { background: var(--crimson); color: var(--white); }
  .ad-nav-btn.disabled { opacity: 0.38; cursor: default; pointer-events: none; }
  .ad-nav-btn svg { width: 17px; height: 17px; flex-shrink: 0; }

  .ad-sidebar-footer {
    padding-top: 1.25rem;
    border-top: 1px solid var(--gold);
    display: flex;
    flex-direction: column;
    gap: 0.15rem;
    margin-top: 2rem;
  }
  .ad-side-link, .ad-side-logout {
    display: flex;
    align-items: center;
    gap: 0.85rem;
    padding: 0.72rem 0.9rem;
    border-radius: 3px;
    color: var(--gold-pale);
    text-decoration: none;
    background: transparent;
    border: none;
    cursor: pointer;
    font-family: 'Cormorant Garamond', serif;
    font-size: 0.84rem;
    transition: background 0.18s, color 0.18s;
  }
  .ad-side-link:hover { background: var(--crimson); color: var(--white); }
  .ad-side-logout { color: var(--gold-light); }
  .ad-side-logout:hover { background: var(--crimson); color: var(--white); }
  .ad-side-link svg, .ad-side-logout svg { width: 17px; height: 17px; flex-shrink: 0; }

  /* ── Main ── */
  .ad-main {
    min-width: 0;
    padding: 2.5rem 2.75rem 3rem;
  }
  .ad-page { animation: adIn 0.3s ease both; }
  @keyframes adIn { from { opacity:0; transform:translateY(8px); } to { opacity:1; transform:translateY(0); } }

  .ad-page-header {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    margin-bottom: 1.6rem;
  }
  .ad-page-header h2 {
    font-family: 'Cormorant Garamond', serif;
    font-size: clamp(1.6rem, 2.6vw, 2rem);
    font-weight: 400;
    color: var(--text-dark);
    line-height: 1.1;
  }
  .ad-page-header p {
    color: var(--text-light);
    font-size: 0.82rem;
    margin-top: 0.28rem;
  }
  .ad-header-action {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.52rem 1.1rem;
    border: 1.5px solid var(--text-dark);
    background: transparent;
    color: var(--text-dark);
    font-family: 'Cinzel', serif;
    font-size: 0.6rem;
    letter-spacing: 0.18em;
    text-transform: uppercase;
    cursor: pointer;
    transition: background 0.2s, color 0.2s;
  }
  .ad-header-action:hover { background: var(--crimson); color: var(--white); }

  .ad-global-error {
    padding: 0.8rem 1.1rem;
    margin-bottom: 1.25rem;
    border-left: 3px solid var(--crimson);
    background: var(--gold-pale);
    color: var(--crimson);
    font-size: 0.78rem;
  }
  .ad-loading {
    padding: 4rem;
    text-align: center;
    color: var(--text-light);
    font-style: italic;
  }

  /* ── Stats bar (queries) ── */
  .ad-stats {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    border: 1px solid var(--gold);
    background: var(--white);
    margin-bottom: 1.6rem;
  }
  .ad-stat {
    padding: 1.35rem 1rem;
    text-align: center;
    border-right: 1px solid var(--gold);
  }
  .ad-stat:last-child { border-right: none; }
  .ad-stat.active { background: var(--crimson-dark); color: var(--white); }
  .ad-stat-value {
    font-family: 'Cinzel', serif;
    font-size: 1.7rem;
    line-height: 1;
    color: inherit;
  }
  .ad-stat-label {
    font-family: 'Cinzel', serif;
    font-size: 0.54rem;
    letter-spacing: 0.26em;
    text-transform: uppercase;
    color: var(--gold);
    margin-top: 0.4rem;
  }
  .ad-stat.active .ad-stat-label { color: var(--gold-pale); }

  /* ── Queries table ── */
  .ad-table-wrap {
    border: 1px solid var(--gold);
    background: var(--white);
  }
  .ad-table-head {
    display: grid;
    grid-template-columns: 2.2fr 1fr 1.1fr;
    border-bottom: 1px solid var(--gold);
    padding: 0 0.5rem;
  }
  .ad-th {
    padding: 1rem 0.85rem;
    font-family: 'Cinzel', serif;
    font-size: 0.52rem;
    letter-spacing: 0.22em;
    text-transform: uppercase;
    color: var(--text-light);
  }
  .ad-table-row {
    display: grid;
    grid-template-columns: 2.2fr 1fr 1.1fr;
    border-bottom: 1px solid var(--gold-pale);
    padding: 0 0.5rem;
    cursor: pointer;
    transition: background 0.15s;
  }
  .ad-table-row:last-child { border-bottom: none; }
  .ad-table-row:hover { background: var(--cream); }
  .ad-td {
    padding: 1.05rem 0.85rem;
    display: flex;
    align-items: center;
    font-size: 0.84rem;
    color: var(--text-mid);
    min-width: 0;
  }
  .ad-td-name { font-weight: 600; color: var(--text-dark); font-size: 0.88rem; }
  .ad-badge {
    display: inline-flex;
    align-items: center;
    padding: 0.3rem 0.72rem;
    border: 1px solid currentColor;
    font-family: 'Cinzel', serif;
    font-size: 0.5rem;
    letter-spacing: 0.16em;
    text-transform: uppercase;
  }
  .ad-badge--new { color: var(--crimson-dark); border-color: var(--crimson-dark); }
  .ad-badge--read { color: var(--gold); border-color: var(--gold); }
  .ad-badge--replied { color: var(--crimson-light); border-color: var(--crimson-light); }

  .ad-actions-cell { display: flex; align-items: center; gap: 0.4rem; }
  .ad-act-btn {
    padding: 0.32rem 0.65rem;
    border: 1px solid var(--gold);
    background: transparent;
    color: var(--text-mid);
    font-family: 'Cinzel', serif;
    font-size: 0.52rem;
    letter-spacing: 0.13em;
    text-transform: uppercase;
    cursor: pointer;
    transition: border-color 0.18s, color 0.18s;
  }
  .ad-act-btn:hover { border-color: var(--crimson); color: var(--crimson); }
  .ad-act-btn--danger { border-color: var(--crimson-light); color: var(--crimson-light); }
  .ad-act-btn--danger:hover { border-color: var(--crimson-dark); color: var(--crimson-dark); }

  .ad-empty {
    padding: 3rem 2rem;
    text-align: center;
    color: var(--text-light);
    font-style: italic;
    font-size: 0.82rem;
  }

  /* ── Query detail view ── */
  .ad-detail-topbar {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 1.8rem;
  }
  .ad-back-btn {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    background: transparent;
    border: none;
    color: var(--text-mid);
    font-family: 'Cormorant Garamond', serif;
    font-size: 0.82rem;
    cursor: pointer;
    transition: color 0.18s;
  }
  .ad-back-btn:hover { color: var(--crimson); }
  .ad-detail-topbar-actions { display: flex; align-items: center; gap: 0.6rem; }
  .ad-topbar-btn {
    padding: 0.45rem 1.05rem;
    border: 1.5px solid var(--gold);
    background: transparent;
    color: var(--text-mid);
    font-family: 'Cinzel', serif;
    font-size: 0.58rem;
    letter-spacing: 0.16em;
    text-transform: uppercase;
    cursor: pointer;
    transition: all 0.18s;
  }
  .ad-topbar-btn:hover { border-color: var(--crimson); color: var(--crimson); }
  .ad-topbar-btn--danger { border-color: var(--crimson-light); color: var(--crimson-light); }
  .ad-topbar-btn--danger:hover { border-color: var(--crimson-dark); color: var(--crimson-dark); }

  .ad-detail-layout {
    display: grid;
    grid-template-columns: minmax(0,1fr) 280px;
    gap: 1.5rem;
    align-items: start;
  }
  .ad-detail-card {
    background: var(--white);
    border: 1px solid var(--gold);
    padding: 2.2rem 2.4rem;
  }
  .ad-detail-client-name {
    font-family: 'Cormorant Garamond', serif;
    font-size: 1.65rem;
    font-weight: 400;
    color: var(--text-dark);
    margin-bottom: 0.3rem;
  }
  .ad-detail-date-label {
    color: var(--text-light);
    font-size: 0.78rem;
    margin-bottom: 1.6rem;
    padding-bottom: 1.4rem;
    border-bottom: 1px solid var(--gold-pale);
  }
  .ad-detail-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 1.4rem 2rem;
    margin-bottom: 1.6rem;
    padding-bottom: 1.6rem;
    border-bottom: 1px solid var(--gold-pale);
  }
  .ad-detail-field label {
    display: block;
    font-family: 'Cinzel', serif;
    font-size: 0.55rem;
    letter-spacing: 0.22em;
    text-transform: uppercase;
    color: var(--text-light);
    margin-bottom: 0.4rem;
  }
  .ad-detail-field p {
    color: var(--text-dark);
    font-size: 0.86rem;
  }
  .ad-detail-field a {
    color: var(--text-dark);
    text-decoration: underline;
    text-underline-offset: 2px;
  }
  .ad-msg-label {
    font-family: 'Cinzel', serif;
    font-size: 0.55rem;
    letter-spacing: 0.22em;
    text-transform: uppercase;
    color: var(--text-light);
    margin-bottom: 0.6rem;
  }
  .ad-msg-box {
    min-height: 90px;
    border: 1px solid var(--gold);
    padding: 0.95rem 1.1rem;
    background: var(--cream);
    color: var(--text-mid);
    font-family: 'Cormorant Garamond', serif;
    font-size: 0.86rem;
    line-height: 1.65;
  }

  /* sidebar panels */
  .ad-detail-sidebar { display: flex; flex-direction: column; gap: 1.2rem; }
  .ad-side-panel {
    background: var(--white);
    border: 1px solid var(--gold);
    padding: 1.4rem 1.5rem;
  }
  .ad-side-panel-label {
    font-family: 'Cinzel', serif;
    font-size: 0.55rem;
    letter-spacing: 0.24em;
    text-transform: uppercase;
    color: var(--text-light);
    margin-bottom: 1rem;
  }
  .ad-quick-action-btn {
    display: block;
    width: 100%;
    padding: 0.78rem;
    border: 1.5px solid var(--gold);
    background: transparent;
    color: var(--text-mid);
    font-family: 'Cinzel', serif;
    font-size: 0.54rem;
    letter-spacing: 0.18em;
    text-transform: uppercase;
    cursor: pointer;
    margin-bottom: 0.65rem;
    transition: all 0.18s;
    text-align: center;
  }
  .ad-quick-action-btn:hover { border-color: var(--crimson); color: var(--crimson); }
  .ad-quick-action-btn:last-child { margin-bottom: 0; }
  .ad-quick-action-btn--primary {
    background: var(--crimson-dark);
    border-color: var(--crimson-dark);
    color: var(--white);
  }
  .ad-quick-action-btn--primary:hover { background: var(--crimson); border-color: var(--white); color: var(--white); }

  .ad-timeline { display: flex; flex-direction: column; gap: 0.75rem; }
  .ad-timeline-item { display: flex; align-items: center; gap: 0.75rem; }
  .ad-timeline-dot {
    width: 10px; height: 10px;
    border-radius: 50%;
    flex-shrink: 0;
  }
  .ad-timeline-dot.done { background: var(--crimson-dark); }
  .ad-timeline-dot.pending { background: transparent; border: 1.5px solid var(--gold); }
  .ad-timeline-item span { font-size: 0.78rem; color: var(--text-mid); }
  .ad-timeline-item.pending span { color: var(--text-light); }

  /* ── Photos page ── */
  .ad-photos-stats {
    display: grid;
    grid-template-columns: repeat(6, 1fr);
    border: 1px solid var(--gold);
    background: var(--white);
    margin-bottom: 1.4rem;
  }
  .ad-photos-stat {
    padding: 1.15rem 0.5rem;
    text-align: center;
    border-right: 1px solid var(--gold);
  }
  .ad-photos-stat:last-child { border-right: none; }
  .ad-photos-stat-value {
    font-family: 'Cinzel', serif;
    font-size: 1.35rem;
    color: var(--text-dark);
    line-height: 1;
  }
  .ad-photos-stat-label {
    font-family: 'Cinzel', serif;
    font-size: 0.48rem;
    letter-spacing: 0.22em;
    text-transform: uppercase;
    color: var(--text-light);
    margin-top: 0.35rem;
  }

  .ad-cat-filter {
    display: flex;
    align-items: center;
    gap: 0.45rem;
    flex-wrap: wrap;
    margin-bottom: 1.4rem;
  }
  .ad-cat-btn {
    padding: 0.46rem 1rem;
    border: 1.5px solid var(--gold);
    background: var(--white);
    color: var(--text-mid);
    font-family: 'Cinzel', serif;
    font-size: 0.58rem;
    letter-spacing: 0.14em;
    text-transform: uppercase;
    cursor: pointer;
    transition: all 0.18s;
  }
  .ad-cat-btn:hover { border-color: var(--crimson); color: var(--crimson); }
  .ad-cat-btn.active { background: var(--crimson-dark); border-color: var(--crimson-dark); color: var(--white); }

  .ad-photo-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 0;
    border: 1px solid var(--gold);
  }
  .ad-photo-card {
    position: relative;
    border-right: 1px solid var(--gold);
    border-bottom: 1px solid var(--gold);
    overflow: hidden;
  }
  .ad-photo-card:nth-child(3n) { border-right: none; }
  .ad-photo-thumb {
    width: 100%;
    aspect-ratio: 4/3;
    object-fit: cover;
    display: block;
    transition: transform 0.4s ease, filter 0.4s ease;
  }
  .ad-photo-card:hover .ad-photo-thumb {
    transform: scale(1.04);
    filter: brightness(0.7);
  }
  .ad-photo-info {
    padding: 0.75rem 0.9rem;
    background: var(--white);
    border-top: 1px solid var(--gold-pale);
  }
  .ad-photo-title { font-size: 1rem; color: var(--text-dark); font-weight: 500; }
  .ad-photo-cat {
    font-family: 'Cinzel', serif;
    font-size: 0.52rem;
    letter-spacing: 0.18em;
    text-transform: uppercase;
    color: var(--text-light);
    margin-top: 0.18rem;
  }
  .ad-photo-delete-overlay {
    position: absolute;
    top: 0.6rem; right: 0.6rem;
    opacity: 0;
    transition: opacity 0.25s;
  }
  .ad-photo-card:hover .ad-photo-delete-overlay { opacity: 1; }
  .ad-photo-del-btn {
    padding: 0.3rem 0.7rem;
    border: none;
    background: var(--crimson);
    color: var(--white);
    font-family: 'Cinzel', serif;
    font-size: 0.5rem;
    letter-spacing: 0.12em;
    cursor: pointer;
  }
  .ad-featured-badge {
    position: absolute;
    top: 0.55rem; left: 0.55rem;
    padding: 0.18rem 0.55rem;
    background: var(--gold);
    color: var(--white);
    font-family: 'Cinzel', serif;
    font-size: 0.48rem;
    letter-spacing: 0.14em;
    text-transform: uppercase;
  }

  /* ── Blogs page ── */
  .ad-blog-grid {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 1.2rem;
  }
  .ad-blog-card {
    overflow: hidden;
    background: var(--white);
    border: 1px solid var(--gold);
  }
  .ad-blog-thumb {
    width: 100%;
    height: 240px;
    object-fit: cover;
    display: block;
  }
  .ad-blog-body {
    padding: 1.2rem 1.25rem 1.35rem;
  }
  .ad-blog-meta {
    display: flex;
    flex-wrap: wrap;
    gap: 0.7rem;
    margin-bottom: 0.7rem;
    font-family: 'Cinzel', serif;
    font-size: 0.48rem;
    letter-spacing: 0.16em;
    text-transform: uppercase;
    color: var(--text-light);
  }
  .ad-blog-title {
    font-size: 1.3rem;
    color: var(--text-dark);
    line-height: 1.1;
  }
  .ad-blog-author {
    margin-top: 0.4rem;
    color: var(--text-light);
    font-size: 0.82rem;
  }
  .ad-blog-excerpt {
    margin-top: 0.9rem;
    color: var(--text-mid);
    font-size: 0.84rem;
    line-height: 1.55;
  }
  .ad-blog-footer {
    margin-top: 1rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 0.8rem;
  }
  .ad-blog-email {
    color: var(--text-light);
    font-size: 0.74rem;
    overflow-wrap: anywhere;
  }

  /* ── Upload modal overlay ── */
  .ad-modal-overlay {
    position: fixed;
    inset: 0;
    background: rgba(44, 24, 16, 0.08);
    backdrop-filter: blur(8px);
    -webkit-backdrop-filter: blur(8px);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 999;
    padding: 1.5rem;
  }
  .ad-modal {
    background: var(--white);
    border: 1px solid var(--gold);
    width: 100%;
    max-width: 520px;
    max-height: 90vh;
    overflow-y: auto;
    animation: adIn 0.22s ease both;
  }
  .ad-modal-head {
    padding: 1.3rem 1.6rem;
    border-bottom: 1px solid var(--gold-pale);
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  .ad-modal-head h3 {
    font-family: 'Cinzel', serif;
    font-size: 0.68rem;
    font-weight: 500;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    color: var(--text-dark);
  }
  .ad-modal-close {
    background: transparent;
    border: none;
    cursor: pointer;
    color: var(--text-light);
    font-size: 1.1rem;
    line-height: 1;
    transition: color 0.18s;
  }
  .ad-modal-close:hover { color: var(--crimson); }
  .ad-modal-body {
    padding: 1.6rem;
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }
  .ad-field { display: flex; flex-direction: column; gap: 0.32rem; }
  .ad-field label {
    font-family: 'Cinzel', serif;
    font-size: 0.5rem;
    letter-spacing: 0.22em;
    text-transform: uppercase;
    color: var(--crimson);
  }
  .ad-field input[type="text"],
  .ad-field input[type="file"],
  .ad-field select {
    width: 100%;
    padding: 0.55rem 0.85rem;
    border: 1.5px solid var(--gold);
    background: var(--cream);
    color: var(--text-dark);
    font-family: 'Cormorant Garamond', serif;
    font-size: 0.82rem;
    outline: none;
    transition: border-color 0.22s, box-shadow 0.22s;
    appearance: none;
  }
  .ad-field input:focus, .ad-field select:focus {
    border-color: var(--gold);
    box-shadow: 0 0 0 3px var(--gold-pale);
    background: var(--white);
  }
  .ad-field input[type="file"] { padding: 0.4rem 0.75rem; font-size: 0.72rem; cursor: pointer; }
  .ad-form-row { display: grid; grid-template-columns: 1fr 1fr; gap: 0.75rem; }
  .ad-checkbox-row {
    display: flex; align-items: center; gap: 0.55rem; cursor: pointer;
  }
  .ad-checkbox-row input { accent-color: var(--crimson); width: 15px; height: 15px; cursor: pointer; }
  .ad-checkbox-row span { color: var(--text-mid); font-size: 0.88rem; }
  .ad-form-msg {
    padding: 0.55rem 0.9rem;
    font-size: 0.76rem;
    line-height: 1.5;
    border: 1px solid;
  }
  .ad-form-msg--error { border-color: var(--crimson); background: var(--gold-pale); color: var(--crimson); }
  .ad-form-msg--success { border-color: var(--gold); background: var(--cream); color: var(--text-dark); }
  .ad-upload-btn {
    width: 100%;
    padding: 0.8rem;
    border: none;
    background: var(--crimson-dark);
    color: var(--white);
    font-family: 'Cinzel', serif;
    font-size: 0.56rem;
    letter-spacing: 0.2em;
    text-transform: uppercase;
    cursor: pointer;
    transition: background 0.2s;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
  }
  .ad-upload-btn:hover:not(:disabled) { background: var(--crimson); }
  .ad-upload-btn:disabled { opacity: 0.55; cursor: not-allowed; }

  @keyframes adSpin { to { transform: rotate(360deg); } }
  .ad-spinner {
    width: 12px; height: 12px;
    border: 2px solid var(--gold-pale);
    border-top-color: var(--white);
    border-radius: 50%;
    animation: adSpin 0.7s linear infinite;
  }

  /* ── Responsive ── */
  @media (max-width: 1100px) {
    .ad-photos-stats { grid-template-columns: repeat(3,1fr); }
    .ad-photos-stat:nth-child(3) { border-right: none; }
    .ad-photos-stat:nth-child(4),
    .ad-photos-stat:nth-child(5),
    .ad-photos-stat:nth-child(6) { border-top: 1px solid var(--gold); }
  }
  @media (max-width: 900px) {
    .ad-shell { grid-template-columns: 1fr; }
    .ad-sidebar { position: static; min-height: auto; padding: 1.2rem 1rem; }
    .ad-sidebar-nav { flex-direction: row; flex-wrap: wrap; }
    .ad-main { padding: 1.5rem; }
    .ad-stats { grid-template-columns: repeat(2,1fr); }
    .ad-stat:nth-child(2) { border-right: none; }
    .ad-stat:nth-child(3), .ad-stat:nth-child(4) { border-top: 1px solid var(--gold); }
    .ad-detail-layout { grid-template-columns: 1fr; }
    .ad-photo-grid { grid-template-columns: repeat(2,1fr); }
    .ad-photo-card:nth-child(3n) { border-right: 1px solid var(--gold); }
    .ad-photo-card:nth-child(2n) { border-right: none; }
  }
  @media (max-width: 600px) {
    .ad-table-head { display: none; }
    .ad-table-row {
      grid-template-columns: minmax(0, 1fr) auto auto;
      align-items: center;
      gap: 0.55rem;
      padding: 0.15rem 0.5rem;
    }
    .ad-td {
      min-width: 0;
      padding: 0.85rem 0.35rem;
    }
    .ad-td-name {
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    .ad-table-row .ad-td:nth-child(2),
    .ad-table-row .ad-td:nth-child(3) {
      justify-content: flex-end;
      white-space: nowrap;
    }
    .ad-badge {
      padding: 0.38rem 0.7rem;
      font-size: 0.5rem;
      letter-spacing: 0.16em;
    }
    .ad-main { padding: 1rem; }
    .ad-photo-grid { grid-template-columns: 1fr; }
    .ad-blog-grid { grid-template-columns: 1fr; }
    .ad-photo-card:nth-child(n) { border-right: none; }
    .ad-photos-stats { grid-template-columns: repeat(2,1fr); }
  }
`

const defaultPhotoForm = {
  photo: null,
  featured: false,
}

function formatDate(value) {
  if (!value) return '-'
  try {
    return new Date(value).toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
      weekday: 'long',
    })
  } catch { return '-' }
}

function formatShortDate(value) {
  if (!value) return '-'
  try {
    return new Date(value).toLocaleDateString('en-IN', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    })
  } catch { return '-' }
}

export default function AdminDashboard() {
  const navigate = useNavigate()
  const token = getAuthToken()

  const [activePage, setActivePage] = useState('queries')
  const [pageKey, setPageKey] = useState(0)
  const [selectedQuery, setSelectedQuery] = useState(null)
  const [showUploadModal, setShowUploadModal] = useState(false)

  const [queries, setQueries] = useState([])
  const [photos, setPhotos] = useState([])
  const [blogs, setBlogs] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [photoForm, setPhotoForm] = useState(defaultPhotoForm)
  const [photoStatus, setPhotoStatus] = useState({ loading: false, error: '', success: '' })

  const unreadCount = useMemo(() => queries.filter(q => q.status === 'new').length, [queries])
  const readCount = useMemo(() => queries.filter(q => q.status === 'read').length, [queries])
  const repliedCount = useMemo(() => queries.filter(q => q.status === 'replied').length, [queries])
  const featuredPhotoCount = useMemo(() => photos.filter(photo => photo.featured).length, [photos])

  useEffect(() => {
    if (!token) return
    let ignore = false
    async function load() {
      try {
        const headers = getAuthHeaders()
        const [qData, pData, bData] = await Promise.all([
          apiFetch('/api/queries', { headers }),
          apiFetch('/api/photos'),
          apiFetch('/api/blogs'),
        ])
        if (ignore) return
        setQueries(Array.isArray(qData) ? qData : [])
        setPhotos(Array.isArray(pData) ? pData : [])
        setBlogs(Array.isArray(bData) ? bData : [])
      } catch (err) {
        if (!ignore) {
          const isUnauthorized = err.status === 401 || (err.message || '').toLowerCase().includes('token')
          setError(isUnauthorized ? 'Your admin session has expired. Please log in again.' : (err.message || 'Unable to load admin data'))
          if (isUnauthorized) {
            clearAuthToken()
            navigate('/admin/login', { replace: true })
          }
        }
      } finally {
        if (!ignore) setLoading(false)
      }
    }
    load()
    return () => { ignore = true }
  }, [navigate, token])

  if (!token) return <Navigate to="/admin/login" replace />

  const handleLogout = () => { clearAuthToken(); navigate('/admin/login', { replace: true }) }

  const updateQueryStatus = async (id, status) => {
    try {
      const updated = await apiFetch(`/api/queries/${id}/status`, {
        method: 'PATCH',
        headers: { ...getAuthHeaders(), 'Content-Type': 'application/json' },
        body: JSON.stringify({ status }),
      })
      setQueries(cur => cur.map(q => q._id === id ? updated : q))
      if (selectedQuery && selectedQuery._id === id) setSelectedQuery(updated)
    } catch (err) { setError(err.message || 'Unable to update') }
  }

  const deleteQuery = async (id) => {
    try {
      await apiFetch(`/api/queries/${id}`, { method: 'DELETE', headers: getAuthHeaders() })
      setQueries(cur => cur.filter(q => q._id !== id))
      if (selectedQuery && selectedQuery._id === id) setSelectedQuery(null)
    } catch (err) { setError(err.message || 'Unable to delete') }
  }

  const handlePhotoChange = ({ target }) => {
    const { name, files, type, checked } = target
    setPhotoForm(cur => ({
      ...cur,
      [name]: type === 'checkbox' ? checked : files ? files[0] || null : null,
    }))
  }

  const handlePhotoSubmit = async (e) => {
    e.preventDefault()
    setPhotoStatus({ loading: true, error: '', success: '' })
    if (!photoForm.photo) {
      setPhotoStatus({ loading: false, error: 'Please choose an image.', success: '' })
      return
    }
    try {
      const fallbackTitle = photoForm.photo.name.replace(/\.[^.]+$/, '') || 'Gallery Image'
      const formData = new FormData()
      formData.append('title', fallbackTitle)
      formData.append('category', 'Gallery')
      formData.append('altText', fallbackTitle)
      formData.append('featured', String(photoForm.featured))
      formData.append('photo', photoForm.photo)
      const created = await apiFetch('/api/photos', {
        method: 'POST',
        headers: getAuthHeaders(),
        body: formData,
      })
      setPhotos(cur => [created, ...cur])
      setPhotoForm(defaultPhotoForm)
      setPhotoStatus({ loading: false, error: '', success: 'Image uploaded successfully.' })
      setTimeout(() => { setShowUploadModal(false); setPhotoStatus({ loading: false, error: '', success: '' }) }, 1400)
    } catch (err) {
      if (err.status === 401) {
        clearAuthToken()
        navigate('/admin/login', { replace: true })
        setPhotoStatus({ loading: false, error: 'Your admin session has expired. Please log in again.', success: '' })
        return
      }

      setPhotoStatus({ loading: false, error: err.message || 'Upload failed', success: '' })
    }
  }

  const deletePhoto = async (id) => {
    try {
      await apiFetch(`/api/photos/${id}`, { method: 'DELETE', headers: getAuthHeaders() })
      setPhotos(cur => cur.filter(p => p._id !== id))
    } catch (err) { setError(err.message || 'Unable to delete') }
  }

  const togglePhotoFeatured = async (photo) => {
    try {
      const updated = await apiFetch(`/api/photos/${photo._id}`, {
        method: 'PATCH',
        headers: { ...getAuthHeaders(), 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: photo.title || photo.altText || 'Gallery Image',
          category: photo.category || 'Gallery',
          altText: photo.altText || photo.title || '',
          featured: !photo.featured,
        }),
      })
      setPhotos(cur => cur.map(item => item._id === photo._id ? updated : item))
    } catch (err) {
      setError(err.message || 'Unable to update photo selection')
    }
  }

  const deleteBlog = async (id) => {
    try {
      await apiFetch(`/api/blogs/${id}`, { method: 'DELETE', headers: getAuthHeaders() })
      setBlogs(cur => cur.filter(blog => blog._id !== id))
    } catch (err) {
      const isUnauthorized = err.status === 401 || (err.message || '').toLowerCase().includes('token')
      if (isUnauthorized) {
        clearAuthToken()
        navigate('/admin/login', { replace: true })
        return
      }
      setError(err.message || 'Unable to delete blog')
    }
  }

  const switchPage = (page) => {
    if (page === activePage && !selectedQuery) return
    setSelectedQuery(null)
    setActivePage(page)
    setPageKey(k => k + 1)
  }

  return (
    <>
      <style>{styles}</style>
      <div className="ad-shell">
        {/* ── Sidebar ── */}
        <aside className="ad-sidebar">
          <div className="ad-sidebar-brand">
            <img src={siteAssets.logo} alt="logo" className="ad-sidebar-logo" />
            <div>
              <div className="ad-sidebar-brand-name">Shanthala Nritya Angala</div>
            </div>
          </div>

          <p className="ad-sidebar-section-label">Management</p>
          <nav className="ad-sidebar-nav">
            <button
              className={`ad-nav-btn ${activePage === 'queries' ? 'active' : ''}`}
              type="button"
              onClick={() => switchPage('queries')}
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
              </svg>
              Queries
            </button>
            <button
              className={`ad-nav-btn ${activePage === 'photos' ? 'active' : ''}`}
              type="button"
              onClick={() => switchPage('photos')}
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="3" width="18" height="18" rx="2" />
                <circle cx="8.5" cy="8.5" r="1.5" />
                <path d="M21 15 16 10 5 21" />
              </svg>
              Photos
            </button>
            <button
              className={`ad-nav-btn ${activePage === 'blogs' ? 'active' : ''}`}
              type="button"
              onClick={() => switchPage('blogs')}
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <path d="M6 4.5h9a2.5 2.5 0 0 1 2.5 2.5v13l-4-2-4 2V7A2.5 2.5 0 0 0 6 4.5Z" />
                <path d="M6 4.5A2.5 2.5 0 0 0 3.5 7v10.5h14" />
              </svg>
              Blogs
            </button>
          </nav>

          <div className="ad-sidebar-footer">
            <Link to="/" className="ad-side-link">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <path d="M3 11 12 3l9 8M5 10v10h14V10" />
              </svg>
              View Website
            </Link>
            <button className="ad-side-logout" type="button" onClick={handleLogout}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4M16 17l5-5-5-5M21 12H9" />
              </svg>
              Logout
            </button>
          </div>
        </aside>

        {/* ── Main ── */}
        <main className="ad-main">
          <div className="ad-page" key={pageKey}>
            {error ? <p className="ad-global-error">{error}</p> : null}
            {loading ? <p className="ad-loading">Loading…</p> : null}

            {/* ── Queries list ── */}
            {!loading && activePage === 'queries' && !selectedQuery ? (
              <>
                <div className="ad-page-header">
                  <div>
                    <h2>Queries</h2>
                    <p>Manage client inquiries and bookings</p>
                  </div>
                </div>

                <div className="ad-stats">
                  <div className="ad-stat active">
                    <div className="ad-stat-value">{queries.length}</div>
                    <div className="ad-stat-label">All</div>
                  </div>
                  <div className="ad-stat">
                    <div className="ad-stat-value">{unreadCount}</div>
                    <div className="ad-stat-label">New</div>
                  </div>
                  <div className="ad-stat">
                    <div className="ad-stat-value">{readCount}</div>
                    <div className="ad-stat-label">Read</div>
                  </div>
                  <div className="ad-stat">
                    <div className="ad-stat-value">{repliedCount}</div>
                    <div className="ad-stat-label">Replied</div>
                  </div>
                </div>

                {queries.length === 0 ? (
                  <p className="ad-empty">No queries yet.</p>
                ) : (
                  <div className="ad-table-wrap">
                    <div className="ad-table-head">
                      <span className="ad-th">Name</span>
                      <span className="ad-th">Status</span>
                      <span className="ad-th">Received</span>
                    </div>
                    {queries.map(q => (
                      <div key={q._id} className="ad-table-row" onClick={() => setSelectedQuery(q)}>
                        <div className="ad-td ad-td-name">{q.name}</div>
                        <div className="ad-td">
                          <span className={`ad-badge ad-badge--${q.status}`}>{q.status}</span>
                        </div>
                        <div className="ad-td">{formatShortDate(q.createdAt)}</div>
                      </div>
                    ))}
                  </div>
                )}
              </>
            ) : null}

            {/* ── Query detail ── */}
            {!loading && activePage === 'queries' && selectedQuery ? (
              <>
                <div className="ad-detail-topbar">
                  <button className="ad-back-btn" type="button" onClick={() => setSelectedQuery(null)}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M19 12H5M12 19l-7-7 7-7" />
                    </svg>
                    Back to Queries
                  </button>
                  <div className="ad-detail-topbar-actions">
                    {selectedQuery.status !== 'read' ? (
                      <button className="ad-topbar-btn" type="button" onClick={() => updateQueryStatus(selectedQuery._id, 'read')}>Read</button>
                    ) : null}
                    <button className="ad-topbar-btn ad-topbar-btn--danger" type="button" onClick={() => deleteQuery(selectedQuery._id)}>Delete</button>
                  </div>
                </div>

                <div className="ad-detail-layout">
                  <div className="ad-detail-card">
                    <h2 className="ad-detail-client-name">{selectedQuery.name}</h2>
                    <p className="ad-detail-date-label">{formatDate(selectedQuery.createdAt)}</p>

                    <div className="ad-detail-grid">
                      <div className="ad-detail-field">
                        <label>Email</label>
                        <p><a href={`mailto:${selectedQuery.email}`}>{selectedQuery.email}</a></p>
                      </div>
                      <div className="ad-detail-field">
                        <label>Phone</label>
                        <p>{selectedQuery.phone || '-'}</p>
                      </div>
                    </div>

                    <p className="ad-msg-label">Message</p>
                    <div className="ad-msg-box">{selectedQuery.message || <em style={{ color: 'var(--text-light)' }}>No message provided.</em>}</div>
                  </div>

                  <div className="ad-detail-sidebar">
                    <div className="ad-side-panel">
                      <p className="ad-side-panel-label">Quick Actions</p>
                      <button className="ad-quick-action-btn" type="button" onClick={() => window.open(`mailto:${selectedQuery.email}`)}>Reply via Email</button>
                      {selectedQuery.phone ? (
                        <button className="ad-quick-action-btn" type="button" onClick={() => window.open(`tel:${selectedQuery.phone}`)}>Call Client</button>
                      ) : (
                        <button className="ad-quick-action-btn" type="button" style={{ opacity: 0.4, cursor: 'default' }}>Call Client</button>
                      )}
                      <button
                        className="ad-quick-action-btn ad-quick-action-btn--primary"
                        type="button"
                        onClick={() => updateQueryStatus(selectedQuery._id, 'replied')}
                      >
                        Mark as Replied
                      </button>
                    </div>

                    <div className="ad-side-panel">
                      <p className="ad-side-panel-label">Status Timeline</p>
                      <div className="ad-timeline">
                        <div className="ad-timeline-item">
                          <span className="ad-timeline-dot done" />
                          <span>Query Received</span>
                        </div>
                        <div className={`ad-timeline-item ${selectedQuery.status === 'new' ? 'pending' : ''}`}>
                          <span className={`ad-timeline-dot ${selectedQuery.status !== 'new' ? 'done' : 'pending'}`} />
                          <span>Query Reviewed</span>
                        </div>
                        <div className={`ad-timeline-item ${selectedQuery.status !== 'replied' ? 'pending' : ''}`}>
                          <span className={`ad-timeline-dot ${selectedQuery.status === 'replied' ? 'done' : 'pending'}`} />
                          <span>Replied to Client</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </>
            ) : null}

            {/* ── Photos page ── */}
            {!loading && activePage === 'photos' ? (
              <>
                <div className="ad-page-header">
                  <div>
                    <h2>Photos</h2>
                    <p>Manage your gallery images</p>
                  </div>
                  <button className="ad-header-action" type="button" onClick={() => { setShowUploadModal(true); setPhotoStatus({ loading: false, error: '', success: '' }) }}>
                    + Upload Photo
                  </button>
                </div>

                <div className="ad-photos-stats">
                  <div className="ad-photos-stat">
                    <div className="ad-photos-stat-value">{photos.length}</div>
                    <div className="ad-photos-stat-label">Total Photos</div>
                  </div>
                  <div className="ad-photos-stat">
                    <div className="ad-photos-stat-value">{featuredPhotoCount}</div>
                    <div className="ad-photos-stat-label">Home Selected</div>
                  </div>
                </div>

                {photos.length === 0 ? (
                  <p className="ad-empty">No photos uploaded yet.</p>
                ) : (
                  <div className="ad-photo-grid">
                    {photos.map(photo => (
                      <div key={photo._id} className="ad-photo-card">
                        {photo.featured ? <span className="ad-featured-badge">Home</span> : null}
                        <img className="ad-photo-thumb" src={photo.url} alt={photo.altText || 'Gallery image'} />
                        <div className="ad-photo-delete-overlay">
                          <button className="ad-photo-del-btn" type="button" onClick={() => togglePhotoFeatured(photo)}>
                            {photo.featured ? 'Remove from Home' : 'Show on Home'}
                          </button>
                          <button className="ad-photo-del-btn" type="button" onClick={() => deletePhoto(photo._id)}>Remove</button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </>
            ) : null}

            {!loading && activePage === 'blogs' ? (
              <>
                <div className="ad-page-header">
                  <div>
                    <h2>Blogs</h2>
                    <p>Review community blog submissions and remove entries when needed</p>
                  </div>
                  <Link className="ad-header-action" to="/blog/submit">
                    + Submit Blog
                  </Link>
                </div>

                <div className="ad-photos-stats">
                  <div className="ad-photos-stat">
                    <div className="ad-photos-stat-value">{blogs.length}</div>
                    <div className="ad-photos-stat-label">Published Blogs</div>
                  </div>
                </div>

                {blogs.length === 0 ? (
                  <p className="ad-empty">No blogs have been submitted yet.</p>
                ) : (
                  <div className="ad-blog-grid">
                    {blogs.map(blog => (
                      <article key={blog._id} className="ad-blog-card">
                        <img className="ad-blog-thumb" src={blog.thumbnailUrl} alt={blog.thumbnailAlt || blog.title} />
                        <div className="ad-blog-body">
                          <div className="ad-blog-meta">
                            <span>{formatShortDate(blog.createdAt)}</span>
                            <span>Public Post</span>
                          </div>
                          <h3 className="ad-blog-title">{blog.title}</h3>
                          <p className="ad-blog-author">By {blog.authorName}</p>
                          <p className="ad-blog-excerpt">{blog.excerpt}</p>
                          <div className="ad-blog-footer">
                            <span className="ad-blog-email">{blog.authorEmail}</span>
                            <button className="ad-act-btn ad-act-btn--danger" type="button" onClick={() => deleteBlog(blog._id)}>
                              Delete
                            </button>
                          </div>
                        </div>
                      </article>
                    ))}
                  </div>
                )}
              </>
            ) : null}
          </div>
        </main>
      </div>

      {/* ── Upload Modal ── */}
      {showUploadModal ? (
        <div className="ad-modal-overlay" onClick={e => { if (e.target === e.currentTarget) setShowUploadModal(false) }}>
          <div className="ad-modal">
            <div className="ad-modal-head">
              <h3>Upload Photo</h3>
              <button className="ad-modal-close" type="button" onClick={() => setShowUploadModal(false)}>×</button>
            </div>
            <form className="ad-modal-body" onSubmit={handlePhotoSubmit}>
              <div className="ad-field">
                <label>Image File</label>
                <input type="file" name="photo" accept="image/*" onChange={handlePhotoChange} required />
              </div>
              <label className="ad-checkbox-row">
                <input type="checkbox" name="featured" checked={photoForm.featured} onChange={handlePhotoChange} />
                <span>Show this image on the Home page gallery</span>
              </label>
              {photoStatus.error ? <p className="ad-form-msg ad-form-msg--error">{photoStatus.error}</p> : null}
              {photoStatus.success ? <p className="ad-form-msg ad-form-msg--success">{photoStatus.success}</p> : null}
              <button className="ad-upload-btn" type="submit" disabled={photoStatus.loading}>
                {photoStatus.loading ? <span className="ad-spinner" /> : null}
                {photoStatus.loading ? 'Uploading…' : 'Upload to Gallery'}
              </button>
            </form>
          </div>
        </div>
      ) : null}
    </>
  )
}
