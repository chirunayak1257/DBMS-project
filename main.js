const users = [
    { id: 1, username: 'alice_wonder', bio: 'Living in a digital wonderland.', join_date: '2023-01-10', followers: 3, following: 3 },
    { id: 16, username: 'peter_parker', bio: 'Friendly neighborhood Spider-Man.', join_date: '2023-04-01', followers: 5, following: 3 },
    { id: 20, username: 'tony_stark', bio: 'Genius, billionaire, playboy...', join_date: '2023-04-20', followers: 5, following: 3 }
];

const posts = [
    {
        id: 30,
        user_id: 20,
        author: 'tony_stark',
        content: 'Avengers meeting at 5.',
        likes: 6,
        comments: [
            { user: 'peter_parker', text: 'On my way.' },
            { user: 'quill_star', text: 'See you there.' }
        ],
        hashtags: ['#avengers', '#marvel']
    },
    {
        id: 16,
        user_id: 16,
        author: 'peter_parker',
        content: 'With great power comes great responsibility.',
        likes: 8,
        comments: [
            { user: 'tony_stark', text: 'Thanks kid.' },
            { user: 'otto_octavius', text: 'I will find you, Peter.' }
        ],
        hashtags: ['#spiderman', '#marvel']
    },
    {
        id: 18,
        user_id: 18,
        author: 'riley_bingham',
        content: 'Learning SQL today.',
        likes: 5,
        comments: [
            { user: 'alice_wonder', text: 'SQL is fun!' },
            { user: 'bob_builder', text: 'Its powerful.' }
        ],
        hashtags: ['#sql', '#coding', '#tech']
    }
];

const hashtags = [
    { tag: '#marvel', count: 14 },
    { tag: '#coding', count: 5 },
    { tag: '#tech', count: 3 },
    { tag: '#spiderman', count: 3 },
    { tag: '#avengers', count: 2 }
];

let groups = [
    {
        id: 1,
        name: 'Tech Enthusiasts',
        description: 'A group for discussing latest tech trends.',
        members: ['suresh', 'chaand', 'chandu', 'ronny']
    },
    {
        id: 2,
        name: 'Marvel Fans',
        description: 'Avengers Assemble!',
        members: ['suresh', 'chaand', 'chandu', 'ronny', 'peter_parker', 'pencil kumar', 'katar mishra']
    },
    {
        id: 3,
        name: 'Wizards & Witchcraft',
        description: 'Everything about the magical world.',
        members: ['raju rastogi', 'harry_potter', 'luke_skywalker']
    }
];

function renderNavbar() {
    const navbar = `
        <div class="logo">SocialApp</div>
        <div class="nav-links">
            <a href="index.html">Feed</a>
            <a href="explore.html">Explore</a>
            <a href="groups.html">Groups</a>
            <a href="profile.html">Profile</a>
        </div>
    `;
    const navEl = document.getElementById('navbar');
    if (navEl) navEl.innerHTML = navbar;
}

function renderPost(post) {
    return `
        <div class="card" id="post-${post.id}">
            <div class="post-header">
                <div class="avatar">${post.author[0].toUpperCase()}</div>
                <div class="post-user">${post.author}</div>
            </div>
            <div class="post-content">
                <p>${post.content}</p>
                <div style="color: var(--accent); margin-top: 0.5rem;">${post.hashtags ? post.hashtags.join(' ') : ''}</div>
            </div>
            <div class="post-footer">
                <div class="action-btn" onclick="likePost(${post.id})">❤️ <span id="likes-${post.id}">${post.likes}</span> Likes</div>
                <div class="action-btn" onclick="toggleComments(${post.id})">💬 ${post.comments.length} Comments</div>
            </div>
            <div id="comments-${post.id}" style="display: none; margin-top: 1rem; border-top: 1px solid var(--border); padding-top: 1rem;">
                <div id="comment-list-${post.id}">
                    ${post.comments.map(c => `
                        <div style="margin-bottom: 0.5rem;">
                            <strong>${c.user}:</strong> ${c.text}
                        </div>
                    `).join('')}
                </div>
                <div style="display: flex; gap: 0.5rem; margin-top: 1rem;">
                    <input type="text" id="new-comment-${post.id}" placeholder="Write a comment..." style="padding: 0.5rem;">
                    <button class="btn" onclick="addComment(${post.id})">Post</button>
                </div>
            </div>
        </div>
    `;
}

function likePost(postId) {
    const post = posts.find(p => p.id === postId);
    if (post) {
        post.likes++;
        const el = document.getElementById(`likes-${postId}`);
        if (el) el.innerText = post.likes;
    }
}

function addComment(postId) {
    const input = document.getElementById(`new-comment-${postId}`);
    const text = input.value.trim();
    if (text) {
        const post = posts.find(p => p.id === postId);
        if (post) {
            const newComment = { user: 'alice_wonder', text: text };
            post.comments.push(newComment);

            const commentList = document.getElementById(`comment-list-${postId}`);
            const div = document.createElement('div');
            div.style.marginBottom = '0.5rem';
            div.innerHTML = `<strong>${newComment.user}:</strong> ${newComment.text}`;
            if (commentList) commentList.appendChild(div);

            input.value = '';
            const footerBtns = document.querySelectorAll(`#post-${postId} .action-btn`);
            if (footerBtns[1]) footerBtns[1].innerText = `💬 ${post.comments.length} Comments`;
        }
    }
}

function createPost() {
    const contentInput = document.getElementById('post-content');
    const tagsInput = document.getElementById('post-tags');
    const content = contentInput ? contentInput.value.trim() : '';
    const tags = tagsInput ? tagsInput.value.split(',').map(t => t.trim().startsWith('#') ? t.trim() : '#' + t.trim()).filter(t => t !== '#') : [];

    if (content) {
        const newPost = {
            id: posts.length + 100,
            user_id: 1,
            author: 'alice_wonder',
            content: content,
            likes: 0,
            comments: [],
            hashtags: tags
        };
        posts.unshift(newPost);
        if (contentInput) contentInput.value = '';
        if (tagsInput) tagsInput.value = '';
        renderFeed();
    }
}

function toggleComments(postId) {
    const el = document.getElementById(`comments-${postId}`);
    if (el) el.style.display = el.style.display === 'none' ? 'block' : 'none';
}

window.onload = () => {
    renderNavbar();
    const path = window.location.pathname;
    if (path.includes('index.html') || path === '/' || path.endsWith('project/') || path.endsWith('index.html')) {
        renderFeed();
    } else if (path.includes('groups.html')) {
        renderGroups();
    } else if (path.includes('profile.html')) {
        renderProfile();
    }
};

function renderGroups() {
    const groupsEl = document.getElementById('groups-list');
    if (groupsEl) {
        groupsEl.innerHTML = groups.map(g => {
            const isMember = g.members.includes('alice_wonder');
            return `
                <div class="card">
                    <div style="display: flex; justify-content: space-between; align-items: start;">
                        <div>
                            <h2 style="color: var(--accent); margin-bottom: 0.5rem;">${g.name}</h2>
                            <p style="color: var(--text-secondary); margin-bottom: 1rem;">${g.description}</p>
                            <p style="font-size: 0.9rem;">👥 ${g.members.length} members</p>
                        </div>
                        <button class="btn" style="background: ${isMember ? '#e74c3c' : 'var(--accent)'}" onclick="toggleJoinGroup(${g.id})">
                            ${isMember ? 'Leave Group' : 'Join Group'}
                        </button>
                    </div>
                    <div style="margin-top: 1.5rem; border-top: 1px solid var(--border); padding-top: 1rem;">
                        <strong>Members:</strong> ${g.members.join(', ')}
                    </div>
                </div>
            `;
        }).join('');
    }
}

function toggleJoinGroup(groupId) {
    const group = groups.find(g => g.id === groupId);
    if (group) {
        const index = group.members.indexOf('alice_wonder');
        if (index > -1) {
            group.members.splice(index, 1);
        } else {
            group.members.push('alice_wonder');
        }
        renderGroups();
    }
}

function createGroup() {
    const nameInput = document.getElementById('group-name');
    const descInput = document.getElementById('group-desc');
    const name = nameInput ? nameInput.value.trim() : '';
    const desc = descInput ? descInput.value.trim() : '';

    if (name) {
        const newGroup = {
            id: groups.length + 1,
            name: name,
            description: desc || 'No description provided.',
            members: ['alice_wonder']
        };
        groups.push(newGroup);
        if (nameInput) nameInput.value = '';
        if (descInput) descInput.value = '';
        renderGroups();
    }
}

function renderFeed() {
    const feedEl = document.getElementById('feed');
    const trendingEl = document.getElementById('trending');

    if (feedEl) {
        const createPostForm = `
            <div class="card">
                <h2 class="sidebar-title">Create Post</h2>
                <textarea id="post-content" placeholder="What's on your mind?" style="margin-bottom: 1rem;"></textarea>
                <div style="display: flex; gap: 1rem;">
                    <input type="text" id="post-tags" placeholder="Hashtags (comma separated)" style="flex-grow: 1;">
                    <button class="btn" onclick="createPost()">Post</button>
                </div>
            </div>
        `;
        feedEl.innerHTML = createPostForm + posts.map(renderPost).join('');
    }

    if (trendingEl) {
        trendingEl.innerHTML = `
            <h2 class="sidebar-title">Trending</h2>
            <ul class="tag-list">
                ${hashtags.map(h => `
                    <li class="tag-item">
                        <span class="tag-name">${h.tag}</span>
                        <span class="tag-count">${h.count} posts</span>
                    </li>
                `).join('')}
            </ul>
        `;
    }
}
