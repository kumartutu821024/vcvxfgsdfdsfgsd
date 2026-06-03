/* ============================================================
   Mission Topper – Unacademy Frontend
   ============================================================ */
// API is injected via index.html as global `API` (obfuscated there)

// Subject emoji map
const SUBJECT_EMOJI = {
    physics: '⚛️',
    chemistry: '🧪',
    'physical chemistry': '🔬',
    'organic chemistry': '🧬',
    'inorganic chemistry': '⚗️',
    biology: '🌿',
    botany: '🌱',
    zoology: '🦁',
    mathematics: '📐',
    maths: '📐',
    english: '📖',
    history: '🏛️',
    geography: '🌍',
    economics: '📊',
    polity: '⚖️',
    upsc: '🏛️',
    default: '📚',
};

function getSubjectEmoji(name) {
    const key = (name || '').toLowerCase();
    // Sort keys by length in descending order to prioritize more specific matches
    const sortedKeys = Object.keys(SUBJECT_EMOJI).sort((a, b) => b.length - a.length);

    for (const k of sortedKeys) {
        if (key.includes(k)) return SUBJECT_EMOJI[k];
    }
    return SUBJECT_EMOJI.default;
}

// ── Endpoint map (obfuscated) ──
const _e = {
    _b: atob('YmF0Y2hlcw=='),
    _s: atob('c3ViamVjdHM='),
    _v: atob('dmlkZW8=')
};

// ── State ──────────────────────────────────────────────────
let state = {
    batches: [],
    currentBatch: null,
    currentSubject: null,
    currentLectures: [],
    currentLectureIndex: 0,
    activeCategory: 'All',
};

// ── DOM helpers ────────────────────────────────────────────
const $ = id => document.getElementById(id);
const pages = ['batches', 'subjects', 'lectures'];

function showPage(name) {
    pages.forEach(p => $(`page-${p}`).classList.toggle('hidden', p !== name));
}

function formatDate(iso) {
    if (!iso) return '';
    const d = new Date(iso);
    return d.toLocaleDateString('en-IN', {
        day: 'numeric',
        month: 'short',
        year: 'numeric'
    });
}

// ── Breadcrumb ─────────────────────────────────────────────
function setBreadcrumb(items) {
    // items: [{label, action}]
    const bc = $('breadcrumb');
    bc.innerHTML = '';
    items.forEach((item, i) => {
        const span = document.createElement('span');
        span.className = 'bc-item' + (i === items.length - 1 ? ' active' : '');
        span.textContent = item.label;
        if (item.action && i < items.length - 1) {
            span.addEventListener('click', item.action);
        }
        bc.appendChild(span);
        if (i < items.length - 1) {
            const sep = document.createElement('span');
            sep.className = 'bc-sep';
            sep.textContent = '›';
            bc.appendChild(sep);
        }
    });
}

// ── Go Home ────────────────────────────────────────────────
function goHome() {
    showPage('batches');
    setBreadcrumb([{
        label: 'Home'
    }]);
    renderBatches(state.batches, state.activeCategory);
}

window.goHome = goHome;

// ── Fetch helpers ──────────────────────────────────────────
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

async function fetchJSON(url) {
    const cachedData = sessionStorage.getItem(url);
    if (cachedData) {
        const {
            data,
            timestamp
        } = JSON.parse(cachedData);
        if (Date.now() - timestamp < CACHE_DURATION) {
            console.log(`✅ Cache hit: ${url}`);
            return data;
        }
        console.log(`⏰ Cache expired: ${url}`);
        sessionStorage.removeItem(url);
    }

    console.log(`🌐 Fetching from network: ${url}`);
    try {
        const res = await fetch(url);
        console.log(`📡 Response status: ${res.status} ${res.statusText}`);

        if (!res.ok) {
            const text = await res.text();
            console.error('Response body:', text);
            throw new Error(`HTTP ${res.status}: ${text}`);
        }

        const data = await res.json();
        console.log(`✅ Response received:`, data);

        sessionStorage.setItem(url, JSON.stringify({
            data,
            timestamp: Date.now()
        }));
        return data;
    } catch (e) {
        console.error('❌ Fetch error:', e);
        throw e;
    }
}

// ── BATCHES PAGE ───────────────────────────────────────────
async function loadBatches() {
    // Set logo icon
    const logoEl = document.getElementById('logo-icon');
    if (logoEl) logoEl.innerHTML = ICONS.logoBook;

    try {
        const url = `${API}/${_e._b}`;
        console.log('📚 Loading batches from:', url);
        const data = await fetchJSON(url);
        console.log('✅ API Response:', data);

        // Check response structure
        if (!data.data || !data.data.batches) {
            throw new Error('Invalid response format: ' + JSON.stringify(data));
        }

        state.batches = data.data.batches;
        console.log('✅ Batches loaded:', state.batches.length, 'items');

        const categories = ['All', ...data.data.categories];
        renderCategoryFilters(categories);
        renderBatches(state.batches, 'All');
    } catch (e) {
        console.error('❌ Error loading batches:', e.message);
        console.error('Error details:', e);
        $('batches-grid').innerHTML = `<div class="empty-state"><div class="empty-icon">${ICONS.warning}</div><p>Failed to load batches. Error: ${e.message}</p></div>`;
    }
}

function renderCategoryFilters(categories) {
    const bar = $('category-filters');
    bar.innerHTML = '';
    categories.forEach(cat => {
        const btn = document.createElement('button');
        btn.className = 'filter-btn' + (cat === state.activeCategory ? ' active' : '');
        btn.textContent = cat;
        btn.addEventListener('click', () => {
            state.activeCategory = cat;
            document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            renderBatches(state.batches, cat);
        });
        bar.appendChild(btn);
    });
}

function thumbHTML(url, fallbackIcon) {
    if (url) {
        return `<div class="card-thumb"><img src="${url}" alt="thumbnail" loading="lazy" onerror="this.style.display='none'" /></div>`;
    }
    return `<div class="card-thumb card-thumb-icon">${fallbackIcon}</div>`;
}

function renderBatches(batches, category) {
    const grid = $('batches-grid');
    console.log('🎨 renderBatches called with:', { batches: batches.length, category });

    const filtered = category === 'All' ? batches : batches.filter(b => b.category === category);
    console.log('📊 Filtered batches:', filtered.length);

    if (!filtered.length) {
        console.warn('⚠️ No batches found for category:', category);
        grid.innerHTML = `<div class="empty-state"><div class="empty-icon">${ICONS.search}</div><p>No batches found.</p></div>`;
        return;
    }

    console.log('✅ Rendering', filtered.length, 'batches');
    grid.innerHTML = '';
    const fragment = document.createDocumentFragment();

    filtered.forEach((batch, idx) => {
        const card = document.createElement('div');
        card.className = 'card';
        console.log(`  Batch ${idx + 1}:`, batch.name);
        card.innerHTML = `
      ${thumbHTML(batch.image, ICONS.graduation)}
      <div class="card-body">
        <div class="card-title">${batch.name}</div>
        <div class="card-sub">${batch.category}</div>
        <div class="card-badge">
          <span class="badge-icon">${ICONS.book}</span>
          ${batch.subjects_count} Subjects
        </div>
      </div>
    `;
        card.addEventListener('click', () => loadSubjects(batch));
        fragment.appendChild(card);
    });
    grid.appendChild(fragment);
    console.log('✅ Grid rendered successfully with', filtered.length, 'batches');
}

// ── SUBJECTS PAGE ──────────────────────────────────────────
async function loadSubjects(batch) {
    state.currentBatch = batch;
    showPage('subjects');
    $('batch-title').textContent = batch.name;
    $('batch-meta').textContent = `${batch.category} · ${batch.subjects_count} Subjects`;
    $('subjects-grid').innerHTML = `<div class="loading-state"><div class="spinner"></div><p>Loading subjects…</p></div>`;

    setBreadcrumb([{
            label: 'Home',
            action: goHome
        },
        {
            label: batch.name
        },
    ]);

    try {
        const data = await fetchJSON(`${API}/${_e._b}/${batch.id}`);
        const subjects = data.data.subjects;
        renderSubjects(subjects);
    } catch (e) {
        $('subjects-grid').innerHTML = `<div class="empty-state"><div class="empty-icon">${ICONS.warning}</div><p>Failed to load subjects.</p></div>`;
    }
}

function renderSubjects(subjects) {
    const grid = $('subjects-grid');
    grid.innerHTML = '';
    const fragment = document.createDocumentFragment();
    subjects.forEach(sub => {
        const icon = getSubjectIcon(sub.name);
        const card = document.createElement('div');
        card.className = 'card subject-card';
        card.innerHTML = `
      ${thumbHTML(sub.image, icon)}
      <div class="card-body">
        <div class="card-title">${sub.name}</div>
        <div class="card-sub">${state.currentBatch.name}</div>
      </div>
    `;
        card.addEventListener('click', () => loadLectures(sub));
        fragment.appendChild(card);
    });
    grid.appendChild(fragment);
}

// ── LECTURES PAGE ──────────────────────────────────────────
async function loadLectures(subject) {
    state.currentSubject = subject;
    showPage('lectures');
    $('subject-title').textContent = subject.name;
    $('subject-meta').textContent = `${state.currentBatch.name}`;
    $('lectures-list').innerHTML = `<div class="loading-state" style="padding:40px 0"><div class="spinner"></div><p>Loading lectures…</p></div>`;

    setBreadcrumb([{
            label: 'Home',
            action: goHome
        },
        {
            label: state.currentBatch.name,
            action: () => loadSubjects(state.currentBatch)
        },
        {
            label: subject.name
        },
    ]);

    try {
        const data = await fetchJSON(`${API}/${_e._s}/${subject.uid || subject.id}`);
        state.currentLectures = data.data.lectures;
        $('subject-meta').textContent = `${state.currentBatch.name} · ${state.currentLectures.length} Lectures`;
        renderLectures(state.currentLectures);
    } catch (e) {
        $('lectures-list').innerHTML = `<div class="empty-state"><div class="empty-icon">${ICONS.warning}</div><p>Failed to load lectures.</p></div>`;
    }
}

function renderLectures(lectures) {
    const list = $('lectures-list');
    list.innerHTML = '';
    lectures.forEach((lec, idx) => {
        const thumb = lec.thumbnail || lec.image || '';
        const card = document.createElement('div');
        card.className = 'lec-card';
        card.innerHTML = `
      <div class="lec-thumb">
        ${thumb ? `<img src="${thumb}" alt="thumb" loading="lazy" onerror="this.style.display='none'" />` : ''}
        <div class="lec-thumb-overlay">${ICONS.playCircle}</div>
        <div class="lec-num">${idx + 1}</div>
      </div>
      <div class="lec-body">
        <div class="lec-title">${lec.title}</div>
        <div class="lec-meta">
          <span class="lec-meta-item">${ICONS.teacher}<span>${lec.teacher || 'Unknown'}</span></span>
          <span class="lec-meta-item">${ICONS.calendar}<span>${formatDate(lec.live_at)}</span></span>
        </div>
        <div class="lec-btns">
          <button class="lec-btn lec-btn-play" onclick="event.stopPropagation(); openPlayer(${idx})">
            ${ICONS.play} Play Video
          </button>
          ${lec.pdf_url
            ? `<div class="pdf-wrap" onclick="event.stopPropagation()">
                <button class="lec-btn lec-btn-pdf" onclick="togglePdfPopup(this)">
                  ${ICONS.pdf} View PDF
                </button>
                <div class="pdf-popup">
                  <a class="pdf-popup-item" href="https://docs.google.com/viewer?url=${encodeURIComponent(lec.pdf_url)}&embedded=false" target="_blank" onclick="closePdfPopup(this)">
                    ${ICONS.globe}<span>View Online</span>
                  </a>
                  <a class="pdf-popup-item" href="${lec.pdf_url}" target="_blank" download onclick="closePdfPopup(this)">
                    ${ICONS.download}<span>Download</span>
                  </a>
                </div>
              </div>`
            : ''}
        </div>
      </div>
    `;
        card.addEventListener('click', () => openPlayer(idx));
        list.appendChild(card);
    });
}

// ── PLAYER PAGE ────────────────────────────────────────────
function openPlayer(index) {
    const lec = state.currentLectures[index];

    const params = new URLSearchParams({
        title: lec.title || '',
        teacher: lec.teacher || '',
        date: lec.live_at || '',
        subject: state.currentSubject ? .name || '',
        batch: state.currentBatch ? .name || '',
        dl_url: lec.downloadable_video_url || '', // .webm — HTML5 player
        pdf_url: lec.pdf_url || '',
    });

    window.open(`player.html?${params.toString()}`, '_blank');
}

// ── INIT ───────────────────────────────────────────────────
loadBatches();

// ── PDF POPUP ──────────────────────────────────────────────
function togglePdfPopup(btn) {
    const popup = btn.nextElementSibling;
    const isOpen = popup.classList.contains('open');
    // close all open popups first
    document.querySelectorAll('.pdf-popup.open').forEach(p => p.classList.remove('open'));
    if (!isOpen) popup.classList.add('open');
}

function closePdfPopup(el) {
    el.closest('.pdf-popup').classList.remove('open');
}

// Close popup when clicking outside
document.addEventListener('click', () => {
    document.querySelectorAll('.pdf-popup.open').forEach(p => p.classList.remove('open'));
});