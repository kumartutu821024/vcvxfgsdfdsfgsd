<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Batches Grid</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }

        /* UI-only mode: keep design changes but hide added create/delete UI */
        #addBatchBtn,
        #addBatchModal,
        #deleteConfirmModal,
        .card-thumb-actions,
        .card-action-btn,
        .modal,
        .confirm-modal {
            display: none !important;
        }

        body {
            font-family: 'Segoe UI', system-ui, -apple-system, sans-serif;
            background: #f8f9fc;
            padding: 20px;
        }

        .container {
            max-width: 1280px;
            margin: 0 auto;
        }

        h1 {
            color: #333;
            margin-bottom: 30px;
            text-align: center;
        }

        #id {
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
            gap: 20px;
            margin-top: 20px;
        }

        .card {
            background: white;
            border-radius: 12px;
            overflow: hidden;
            box-shadow: 0 2px 12px rgba(0, 0, 0, 0.08);
            transition: transform 0.2s, box-shadow 0.2s;
            cursor: pointer;
        }

        .card:hover {
            transform: translateY(-4px);
            box-shadow: 0 8px 28px rgba(108, 71, 255, 0.15);
        }

        .card-thumb {
            width: 100%;
            height: 200px;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            overflow: hidden;
        }

        .card-thumb img {
            width: 100%;
            height: 100%;
            object-fit: cover;
        }

        .card-body {
            padding: 20px;
        }

        .card-title {
            font-size: 18px;
            font-weight: 600;
            color: #333;
            margin-bottom: 8px;
            line-height: 1.3;
        }

        .card-sub {
            font-size: 14px;
            color: #666;
            margin-bottom: 12px;
        }

        .card-badge {
            display: inline-flex;
            align-items: center;
            gap: 6px;
            background: #ede9ff;
            color: #6c47ff;
            padding: 8px 12px;
            border-radius: 6px;
            font-size: 13px;
            font-weight: 500;
        }

        .badge-icon {
            font-size: 16px;
        }

        .loading-state {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            padding: 60px 20px;
            color: #666;
        }

        .spinner {
            width: 40px;
            height: 40px;
            border: 4px solid #f3f3f3;
            border-top: 4px solid #6c47ff;
            border-radius: 50%;
            animation: spin 1s linear infinite;
            margin-bottom: 20px;
        }

        @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
        }

        .empty-state {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            padding: 60px 20px;
            color: #999;
            text-align: center;
        }

        .empty-icon {
            font-size: 48px;
            margin-bottom: 20px;
        }

        .lectures-list {
            display: flex;
            flex-direction: column;
            gap: 15px;
            margin-top: 20px;
        }

        .lec-card {
            background: white;
            border-radius: 12px;
            overflow: hidden;
            box-shadow: 0 2px 12px rgba(0, 0, 0, 0.08);
            transition: transform 0.2s;
            display: flex;
        }

        .lec-card:hover {
            transform: translateY(-2px);
            box-shadow: 0 8px 28px rgba(108, 71, 255, 0.15);
        }

        .lec-thumb {
            width: 200px;
            height: 150px;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            overflow: hidden;
            flex-shrink: 0;
            position: relative;
        }

        .lec-thumb img {
            width: 100%;
            height: 100%;
            object-fit: cover;
        }

        .lec-thumb-overlay {
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            font-size: 40px;
            opacity: 0.8;
        }

        .lec-body {
            padding: 20px;
            flex: 1;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
        }

        .lec-title {
            font-size: 18px;
            font-weight: 600;
            color: #333;
            margin-bottom: 10px;
            line-height: 1.3;
        }

        .lec-meta {
            display: flex;
            gap: 15px;
            margin-bottom: 15px;
            font-size: 13px;
            color: #666;
            flex-wrap: wrap;
        }

        .lec-meta-item {
            display: flex;
            align-items: center;
            gap: 5px;
        }

        .lec-btns {
            display: flex;
            gap: 10px;
            flex-wrap: wrap;
        }

        .lec-btn {
            display: inline-flex;
            align-items: center;
            gap: 6px;
            padding: 10px 16px;
            border: none;
            border-radius: 6px;
            cursor: pointer;
            font-size: 13px;
            font-weight: 500;
            transition: all 0.2s;
            text-decoration: none;
        }

        .lec-btn-play {
            background: #6c47ff;
            color: white;
        }

        .lec-btn-play:hover {
            background: #5a36d9;
        }

        .lec-btn-pdf {
            background: #f0f0f0;
            color: #333;
        }

        .lec-btn-pdf:hover {
            background: #e0e0e0;
        }

        @media (max-width: 768px) {
            .lec-card {
                flex-direction: column;
            }

            .lec-thumb {
                width: 100%;
                height: 150px;
            }
        }
    </style>
</head>
<body>
<div class="container">
    <div id="header">
        <button id="backBtn" style="display:none; margin-bottom: 20px; padding: 10px 20px; background: #6c47ff; color: white; border: none; border-radius: 6px; cursor: pointer; font-size: 14px;">← Back to Batches</button>
        <h1 id="pageTitle">📚 Study Portal</h1>
    </div>
    <div id="id">
        <div class="loading-state">
            <div class="spinner"></div>
            <p>Loading content…</p>
        </div>
    </div>
</div>

<script>
    // API endpoint
    const API = './api.php';

    // State
    let currentView = 'batches'; // 'batches', 'subjects', or 'lectures'
    let currentBatchId = null;
    let currentBatchName = null;
    let currentSubjectId = null;
    let currentSubjectName = null;

    // Fetch and display batches
    async function loadBatches() {
        const grid = document.getElementById('id');
        document.getElementById('pageTitle').textContent = '📚 Study Portal';
        document.getElementById('backBtn').style.display = 'none';
        currentView = 'batches';

        try {
            console.log('🔄 Loading batches from:', API + '/batches');
            const response = await fetch(API + '/batches');
            const data = await response.json();

            console.log('📊 Response:', data);

            if (!response.ok || !data.success) {
                throw new Error('Failed to load batches');
            }

            const batches = data.data.batches;
            console.log('✅ Batches loaded:', batches.length);

            if (batches.length === 0) {
                grid.innerHTML = `
                    <div class="empty-state" style="grid-column: 1/-1;">
                        <div class="empty-icon">📭</div>
                        <p>No batches found.</p>
                    </div>
                `;
                return;
            }

            // Clear loading state
            grid.innerHTML = '';

            // Render batches
            batches.forEach(batch => {
                const card = document.createElement('div');
                card.className = 'card';
                card.style.cursor = 'pointer';
                card.innerHTML = `
                    <div class="card-thumb">
                        ${batch.image ? `<img src="${batch.image}" alt="${batch.name}" onerror="this.style.display='none'">` : ''}
                    </div>
                    <div class="card-body">
                        <div class="card-title">${batch.name}</div>
                        <div class="card-sub">${batch.category}</div>
                        <div class="card-badge">
                            <span class="badge-icon">📖</span>
                            ${batch.subjects_count} Subjects
                        </div>
                    </div>
                `;
                card.addEventListener('click', () => loadSubjects(batch));
                grid.appendChild(card);
            });

            console.log('✅ Grid rendered with', batches.length, 'batches');

        } catch (e) {
            console.error('❌ Error:', e);
            grid.innerHTML = `
                <div class="empty-state" style="grid-column: 1/-1;">
                    <div class="empty-icon">⚠️</div>
                    <p>Failed to load batches.</p>
                    <p style="font-size: 12px; margin-top: 10px; color: #999;">${e.message}</p>
                </div>
            `;
        }
    }

    // Load subjects for a batch
    async function loadSubjects(batch) {
        const grid = document.getElementById('id');
        currentBatchId = batch.id;
        currentBatchName = batch.name;
        currentView = 'subjects';

        document.getElementById('pageTitle').textContent = `📖 ${batch.name}`;
        document.getElementById('backBtn').style.display = 'block';

        grid.innerHTML = `
            <div class="loading-state" style="grid-column: 1/-1;">
                <div class="spinner"></div>
                <p>Loading subjects…</p>
            </div>
        `;

        try {
            const url = `${API}/batches/${encodeURIComponent(batch.id)}`;
            console.log('🔄 Loading subjects from:', url);
            const response = await fetch(url);
            const data = await response.json();

            console.log('📊 Subjects Response:', data);

            if (!response.ok || !data.success) {
                throw new Error('Failed to load subjects');
            }

            const subjects = data.data.subjects;
            console.log('✅ Subjects loaded:', subjects.length);

            if (subjects.length === 0) {
                grid.innerHTML = `
                    <div class="empty-state" style="grid-column: 1/-1;">
                        <div class="empty-icon">📭</div>
                        <p>No subjects found.</p>
                    </div>
                `;
                return;
            }

            // Clear loading state
            grid.innerHTML = '';

            // Render subjects
            subjects.forEach(subject => {
                const card = document.createElement('div');
                card.className = 'card';
                card.style.cursor = 'pointer';
                card.innerHTML = `
                    <div class="card-thumb">
                        ${subject.image ? `<img src="${subject.image}" alt="${subject.name}" onerror="this.style.display='none'">` : ''}
                    </div>
                    <div class="card-body">
                        <div class="card-title">${subject.name}</div>
                        <div class="card-sub">${currentBatchName}</div>
                        <div class="card-badge">
                            <span class="badge-icon">🎬</span>
                            ${subject.lectures_count || 0} Lectures
                        </div>
                    </div>
                `;
                card.addEventListener('click', () => loadLectures(subject));
                grid.appendChild(card);
            });

            console.log('✅ Subjects grid rendered with', subjects.length, 'subjects');

        } catch (e) {
            console.error('❌ Error:', e);
            grid.innerHTML = `
                <div class="empty-state" style="grid-column: 1/-1;">
                    <div class="empty-icon">⚠️</div>
                    <p>Failed to load subjects.</p>
                    <p style="font-size: 12px; margin-top: 10px; color: #999;">${e.message}</p>
                </div>
            `;
        }
    }

    // Load lectures for a subject
    async function loadLectures(subject) {
        const grid = document.getElementById('id');
        currentSubjectId = subject.uid || subject.id;
        currentSubjectName = subject.name;
        currentView = 'lectures';

        document.getElementById('pageTitle').textContent = `🎬 ${subject.name}`;
        document.getElementById('backBtn').textContent = '← Back to Subjects';
        document.getElementById('backBtn').style.display = 'block';

        // Change back button behavior
        document.getElementById('backBtn').onclick = () => loadSubjects({
            id: currentBatchId,
            name: currentBatchName
        });

        grid.innerHTML = `
            <div class="loading-state" style="grid-column: 1/-1;">
                <div class="spinner"></div>
                <p>Loading lectures…</p>
            </div>
        `;

        try {
            const url = `${API}/subjects/${encodeURIComponent(currentSubjectId)}`;
            console.log('🔄 Loading lectures from:', url);
            const response = await fetch(url);
            const data = await response.json();

            console.log('📊 Lectures Response:', data);

            if (!response.ok || !data.success) {
                throw new Error('Failed to load lectures');
            }

            const lectures = data.data.lectures;
            console.log('✅ Lectures loaded:', lectures.length);

            if (lectures.length === 0) {
                grid.innerHTML = `
                    <div class="empty-state" style="grid-column: 1/-1;">
                        <div class="empty-icon">📭</div>
                        <p>No lectures found.</p>
                    </div>
                `;
                return;
            }

            // Display lectures differently
            grid.classList.add('lectures-list');
            grid.innerHTML = '';

            // Render lectures
            lectures.forEach((lecture, idx) => {
                const card = document.createElement('div');
                card.className = 'lec-card';

                const dlUrl = lecture.downloadable_video_url || lecture.video_url || '';
                const params = new URLSearchParams({
                    title: lecture.title || '',
                    teacher: lecture.teacher || '',
                    date: lecture.live_at || '',
                    subject: currentSubjectName || '',
                    batch: currentBatchName || '',
                    dl_url: dlUrl,
                    pdf_url: lecture.pdf_url || ''
                }).toString();
                const videoBtn = dlUrl ? `
                    <a href="player.html?${params}" target="_blank" class="lec-btn lec-btn-play">
                        ▶️ Play Video
                    </a>
                ` : '';

                const pdfBtn = lecture.pdf_url ? `
                    <a href="${lecture.pdf_url}" target="_blank" class="lec-btn lec-btn-pdf">
                        📄 View PDF
                    </a>
                ` : '';

                card.innerHTML = `
                    <div class="lec-thumb">
                        ${lecture.thumbnail ? `<img src="${lecture.thumbnail}" alt="${lecture.title}" onerror="this.style.display='none'">` : ''}
                        <div class="lec-thumb-overlay">▶️</div>
                    </div>
                    <div class="lec-body">
                        <div>
                            <div class="lec-title">${lecture.title || 'Untitled Lecture'}</div>
                            <div class="lec-meta">
                                ${lecture.teacher ? `<span class="lec-meta-item">👨‍🏫 ${lecture.teacher}</span>` : ''}
                                ${lecture.live_at ? `<span class="lec-meta-item">📅 ${new Date(lecture.live_at).toLocaleDateString('en-IN')}</span>` : ''}
                            </div>
                        </div>
                        <div class="lec-btns">
                            ${videoBtn}
                            ${pdfBtn}
                        </div>
                    </div>
                `;
                grid.appendChild(card);
            });

            console.log('✅ Lectures rendered with', lectures.length, 'lectures');

        } catch (e) {
            console.error('❌ Error:', e);
            grid.classList.remove('lectures-list');
            grid.innerHTML = `
                <div class="empty-state" style="grid-column: 1/-1;">
                    <div class="empty-icon">⚠️</div>
                    <p>Failed to load lectures.</p>
                    <p style="font-size: 12px; margin-top: 10px; color: #999;">${e.message}</p>
                </div>
            `;
        }
    }

    // Back button handler
    document.getElementById('backBtn').addEventListener('click', loadBatches);

    // Load batches when page loads
    window.addEventListener('load', loadBatches);

    // User Tracking Script
    function trackUser() {
        let deviceId = localStorage.getItem('admin_device_id');
        if (!deviceId) {
            deviceId = 'device_' + Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
            localStorage.setItem('admin_device_id', deviceId);
        }

        const sendHeartbeat = () => {
            fetch('track.php', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ deviceId: deviceId })
            }).catch(() => {});
        };

        sendHeartbeat();
        setInterval(sendHeartbeat, 60000); // Heartbeat every minute
    }
    trackUser();
</script>
</body>
</html>

