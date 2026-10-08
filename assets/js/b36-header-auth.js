/**
 * Bridgeway36 - Global Header Authentication & User Profile Component
 * Renders avatar icon (Man / Woman / Custom Photo) + First Name in the header
 * when a user is registered or logged in, with a dropdown menu and mobile support.
 */
(function () {
  'use strict';

  // SVG Avatars matching Bridgeway36 Brand (Navy suit, Gold accent)
  const AVATARS = {
    female: `<svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" aria-label="Woman Avatar">
      <circle cx="32" cy="32" r="32" fill="#eef5fa"/>
      <path d="M18 30C18 20 23 12 32 12C41 12 46 20 46 30C46 37 45 44 42 47C39 42 38 36 38 36H26C26 36 25 42 22 47C19 44 18 37 18 30Z" fill="#7a4e2d"/>
      <path d="M12 58C12 48 20 42 32 42C44 42 52 48 52 58V64H12V58Z" fill="#0b3a63"/>
      <path d="M26 42L32 50L38 42H26Z" fill="#ffffff"/>
      <path d="M30 47L32 53L34 47H30Z" fill="#b28a49"/>
      <path d="M28 35H36V43H28V35Z" fill="#f6c8a7"/>
      <path d="M23 26C23 20 27 16 32 16C37 16 41 20 41 26C41 33 37 37 32 37C27 37 23 33 23 26Z" fill="#ffd8bc"/>
      <path d="M21 24C23 18 27 14 32 14C37 14 42 17 43 23C40 20 36 19 32 19C27 19 23 21 21 24Z" fill="#935d36"/>
      <path d="M21 24C22 28 22 34 23 37C22 35 21 31 21 24Z" fill="#7a4e2d"/>
      <path d="M43 23C42 28 42 34 41 37C42 35 43 31 43 23Z" fill="#7a4e2d"/>
      <circle cx="28" cy="26" r="1.5" fill="#3a2312"/>
      <circle cx="36" cy="26" r="1.5" fill="#3a2312"/>
      <path d="M29.5 31C30.5 32.2 33.5 32.2 34.5 31" stroke="#d47963" stroke-width="1.5" stroke-linecap="round"/>
    </svg>`,

    male: `<svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" aria-label="Man Avatar">
      <circle cx="32" cy="32" r="32" fill="#eaf1f7"/>
      <path d="M12 58C12 47 20 41 32 41C44 41 52 47 52 58V64H12V58Z" fill="#0b3a63"/>
      <path d="M26 41L32 52L38 41H26Z" fill="#ffffff"/>
      <path d="M30 43L32 56L34 43L32 41L30 43Z" fill="#b28a49"/>
      <path d="M27 34H37V42H27V34Z" fill="#eebf99"/>
      <path d="M23 25C23 19 27 15 32 15C37 15 41 19 41 25C41 32 37 36 32 36C27 36 23 32 23 25Z" fill="#ffd8bc"/>
      <path d="M21 23C21 16 25 12 32 12C39 12 43 15 43 21C40 18 36 17 32 17C26 17 22 20 21 23Z" fill="#2d3748"/>
      <path d="M21 23V25C22 23 23 21 24 20C22 21 21 22 21 23Z" fill="#2d3748"/>
      <path d="M43 21V24C42 22 41 21 40 20C42 20 43 21 43 21Z" fill="#2d3748"/>
      <circle cx="28" cy="25" r="1.5" fill="#1a202c"/>
      <circle cx="36" cy="25" r="1.5" fill="#1a202c"/>
      <path d="M29.5 30.5C30.5 31.8 33.5 31.8 34.5 30.5" stroke="#c57457" stroke-width="1.5" stroke-linecap="round"/>
    </svg>`,

    neutral: `<svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" aria-label="Member Avatar">
      <circle cx="32" cy="32" r="32" fill="#0b3a63"/>
      <path d="M16 56C16 46 23 41 32 41C41 41 48 46 48 56V64H16V56Z" fill="#ffffff" fill-opacity="0.85"/>
      <circle cx="32" cy="26" r="10" fill="#ffffff" fill-opacity="0.85"/>
    </svg>`
  };

  // Common female names for auto-detection fallback
  const FEMALE_NAMES = new Set([
    'sarah', 'sara', 'emma', 'jessica', 'emily', 'anna', 'lisa', 'maria', 'sophia', 'mary',
    'olivia', 'ava', 'isabella', 'mia', 'charlotte', 'amelia', 'harper', 'evelyn', 'abigail',
    'elizabeth', 'sofia', 'avery', 'ella', 'madison', 'scarlett', 'victoria', 'aria', 'grace',
    'chloe', 'camila', 'penelope', 'riley', 'layla', 'lillian', 'nora', 'zoey', 'mila', 'aubrey',
    'hannah', 'lily', 'addison', 'eleanor', 'natalie', 'luna', 'savannah', 'brooklyn', 'leah',
    'zoe', 'stella', 'hazel', 'ellie', 'paisley', 'audrey', 'skylar', 'violet', 'claire', 'bella'
  ]);

  function detectGender(firstName) {
    if (!firstName) return 'female'; // Default demo user is Sarah Jenkins
    const clean = firstName.trim().toLowerCase();
    if (clean === 'alex') return 'male';
    if (FEMALE_NAMES.has(clean)) return 'female';
    return 'male';
  }

  function getAvatarHtml(gender, customPhoto) {
    if (customPhoto) {
      return `<img src="${customPhoto}" alt="Profile Picture" class="avatar-render-img" />`;
    }
    const key = (gender === 'female' || gender === 'male' || gender === 'neutral') ? gender : 'female';
    return AVATARS[key];
  }

  window.B36HeaderAuth = {
    AVATARS: AVATARS,
    detectGender: detectGender,
    getAvatarHtml: getAvatarHtml
  };

  // Inject CSS once into head
  function injectStyles() {
    if (document.getElementById('b36-header-auth-css')) return;
    const style = document.createElement('style');
    style.id = 'b36-header-auth-css';
    style.textContent = `
      .user-header-profile {
        position: relative;
        display: inline-flex;
        align-items: center;
        z-index: 101;
      }
      .user-profile-btn {
        display: inline-flex;
        align-items: center;
        gap: 10px;
        padding: 5px 14px 5px 6px;
        background: #f4f8fb;
        border: 1.5px solid #cbdde8;
        border-radius: 999px;
        cursor: pointer;
        transition: all 0.2s cubic-bezier(0.16, 1, 0.3, 1);
        color: #0b3a63;
        font-family: inherit;
        text-decoration: none;
      }
      .user-profile-btn:hover, .user-profile-btn.active {
        background: #eef5fa;
        border-color: #0b3a63;
        box-shadow: 0 4px 14px rgba(11, 58, 99, 0.12);
        transform: translateY(-1px);
      }
      .user-avatar-wrap {
        width: 36px;
        height: 36px;
        border-radius: 50%;
        overflow: hidden;
        display: flex;
        align-items: center;
        justify-content: center;
        background: #0b3a63;
        flex-shrink: 0;
        box-shadow: 0 2px 6px rgba(11, 58, 99, 0.15);
      }
      .user-avatar-wrap svg, .user-avatar-wrap img {
        width: 100%;
        height: 100%;
        display: block;
        object-fit: cover;
      }
      .user-first-name {
        font-size: 14.5px;
        font-weight: 700;
        color: #0b3a63;
        max-width: 130px;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
      .user-chevron {
        width: 12px;
        height: 12px;
        color: #648197;
        transition: transform 0.2s ease;
      }
      .user-profile-btn.active .user-chevron {
        transform: rotate(180deg);
      }
      .user-dropdown-menu {
        position: absolute;
        top: calc(100% + 10px);
        right: 0;
        width: 280px;
        background: #ffffff;
        border-radius: 16px;
        border: 1px solid #dbe5ea;
        box-shadow: 0 16px 40px rgba(11, 58, 99, 0.16);
        padding: 16px;
        z-index: 1000;
        opacity: 0;
        visibility: hidden;
        transform: translateY(-8px);
        transition: all 0.2s cubic-bezier(0.16, 1, 0.3, 1);
      }
      .user-dropdown-menu.show {
        opacity: 1;
        visibility: visible;
        transform: translateY(0);
      }
      .dropdown-user-header {
        display: flex;
        align-items: center;
        gap: 12px;
        padding-bottom: 12px;
        border-bottom: 1px solid #edf2f6;
      }
      .dropdown-avatar-wrap {
        width: 46px;
        height: 46px;
        border-radius: 50%;
        overflow: hidden;
        flex-shrink: 0;
        box-shadow: 0 2px 8px rgba(11, 58, 99, 0.12);
      }
      .dropdown-avatar-wrap svg, .dropdown-avatar-wrap img {
        width: 100%;
        height: 100%;
        display: block;
        object-fit: cover;
      }
      .dropdown-user-info {
        display: flex;
        flex-direction: column;
        min-width: 0;
      }
      .dropdown-user-info strong {
        font-size: 15px;
        color: #0b3a63;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
      .dropdown-user-info span {
        font-size: 12.5px;
        color: #50677a;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
      .dropdown-member-badge {
        display: inline-flex;
        align-items: center;
        font-size: 10.5px;
        font-weight: 800;
        text-transform: uppercase;
        letter-spacing: 0.8px;
        color: #1d7a4d;
        background: #e9f7ef;
        padding: 2px 8px;
        border-radius: 99px;
        margin-top: 4px;
        width: fit-content;
      }
      .avatar-gender-picker {
        background: #f6f9fb;
        border: 1px solid #dbe5ea;
        border-radius: 10px;
        padding: 10px 12px;
        margin: 12px 0 8px;
      }
      .avatar-gender-picker small {
        display: block;
        font-size: 11px;
        font-weight: 700;
        color: #648197;
        text-transform: uppercase;
        letter-spacing: 0.6px;
        margin-bottom: 6px;
      }
      .gender-pill-group {
        display: flex;
        gap: 6px;
      }
      .gender-pill {
        flex: 1;
        padding: 6px 4px;
        font-size: 12px;
        font-weight: 700;
        color: #50677a;
        border: 1px solid #cbdde8;
        background: #fff;
        border-radius: 6px;
        cursor: pointer;
        transition: all 0.2s ease;
        text-align: center;
      }
      .gender-pill:hover {
        border-color: #0b3a63;
        color: #0b3a63;
      }
      .gender-pill.active {
        background: #0b3a63;
        color: #ffffff;
        border-color: #0b3a63;
      }
      .dropdown-divider {
        height: 1px;
        background: #edf2f6;
        margin: 8px 0;
      }
      .dropdown-link {
        display: flex;
        align-items: center;
        gap: 10px;
        padding: 9px 12px;
        font-size: 13.5px;
        font-weight: 600;
        color: #163d61;
        border-radius: 8px;
        transition: all 0.2s ease;
        text-decoration: none;
        cursor: pointer;
        width: 100%;
        border: none;
        background: none;
        text-align: left;
      }
      .dropdown-link:hover {
        background: #f0f5f9;
        color: #0b3a63;
      }
      .dropdown-link.sign-out-link {
        color: #c53030;
      }
      .dropdown-link.sign-out-link:hover {
        background: #fff5f5;
        color: #e53e3e;
      }
      /* Mobile Drawer User Card */
      .mobile-user-card {
        display: flex;
        align-items: center;
        gap: 12px;
        background: #f4f8fb;
        border: 1.5px solid #dbe5ea;
        border-radius: 12px;
        padding: 12px 14px;
        margin: 12px 0 8px;
      }
      .mobile-user-card .user-avatar-wrap {
        width: 44px;
        height: 44px;
      }
      .mobile-user-details {
        display: flex;
        flex-direction: column;
        min-width: 0;
      }
      .mobile-user-name {
        font-size: 15px;
        font-weight: 700;
        color: #0b3a63;
      }
      .mobile-user-status {
        font-size: 12px;
        color: #1d7a4d;
        font-weight: 600;
      }
    `;
    document.head.appendChild(style);
  }

  // Load and render user state in header
  window.initBridgewayHeaderAuth = function () {
    injectStyles();

    let user = null;
    try {
      user = JSON.parse(localStorage.getItem('b36_user') || 'null');
    } catch (e) {}

    // Determine user info and avatars
    let firstName = 'Member';
    let fullName = 'Member';
    let gender = 'female';
    let avatarSvg = AVATARS.female;

    if (user) {
      firstName = user.first || (user.email ? user.email.split('@')[0] : 'Member');
      fullName = ((user.first || '') + ' ' + (user.last || '')).trim() || firstName;
      gender = user.gender || detectGender(firstName);
      if (!user.gender) {
        user.gender = gender;
        localStorage.setItem('b36_user', JSON.stringify(user));
      }
      avatarSvg = getAvatarHtml(gender, user.photo);

      // Sync dashboard.html avatar buttons if present
      document.querySelectorAll('.user-avatar-btn').forEach(btn => {
        btn.innerHTML = avatarSvg;
        btn.title = `${fullName} - Settings & Preferences`;
        btn.style.padding = '0';
        btn.style.overflow = 'hidden';
        btn.style.display = 'flex';
        btn.style.alignItems = 'center';
        btn.style.justifyContent = 'center';
      });

      const settingName = document.getElementById('settingName');
      if (settingName && user.first) settingName.value = fullName;
      const settingEmail = document.getElementById('settingEmail');
      if (settingEmail && user.email) settingEmail.value = user.email;
    }

    // Find desktop nav auth group
    const authGroup = document.querySelector('.nav-auth-group');
    if (!authGroup) {
      updateMobileDrawer(user, firstName, fullName, gender, avatarSvg);
      return;
    }

    if (!user) {
      // User is logged out: restore default Sign In / Register buttons
      authGroup.innerHTML = `
        <a href="login.html" class="nav-auth-link">Sign In</a>
        <a href="login.html#register" class="nav-auth-btn">Register</a>
      `;
      updateMobileDrawer(null);
      return;
    }

    // Check membership tier
    let memberLabel = 'Free Member';
    try {
      const memb = JSON.parse(localStorage.getItem('b36_membership') || 'null');
      if (memb && memb.status === 'active') {
        memberLabel = memb.plan === 'year' ? 'Annual Member' : 'Monthly Member';
      }
    } catch (e) {}

    // Render User Header Profile & Dropdown Menu
    authGroup.innerHTML = `
      <div class="user-header-profile" id="userHeaderProfile">
        <button type="button" class="user-profile-btn" id="userProfileBtn" aria-haspopup="true" aria-expanded="false" title="${fullName} - Account Menu">
          <div class="user-avatar-wrap" id="headerAvatarWrap">
            ${avatarSvg}
          </div>
          <span class="user-first-name">${firstName}</span>
          <svg class="user-chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="6 9 12 15 18 9"></polyline></svg>
        </button>

        <div class="user-dropdown-menu" id="userDropdownMenu" role="menu">
          <div class="dropdown-user-header">
            <div class="dropdown-avatar-wrap" id="dropdownAvatarWrap">
              ${avatarSvg}
            </div>
            <div class="dropdown-user-info">
              <strong>${fullName}</strong>
              <span>${user.email || ''}</span>
              <span class="dropdown-member-badge">✓ ${memberLabel}</span>
            </div>
          </div>

          <div class="avatar-gender-picker">
            <small>Avatar Character</small>
            <div class="gender-pill-group">
              <button type="button" class="gender-pill ${gender === 'female' ? 'active' : ''}" data-g="female" title="Woman Avatar">👩 Woman</button>
              <button type="button" class="gender-pill ${gender === 'male' ? 'active' : ''}" data-g="male" title="Man Avatar">👨 Man</button>
              <button type="button" class="gender-pill ${gender === 'neutral' ? 'active' : ''}" data-g="neutral" title="Default Icon">👤 Neutral</button>
            </div>
          </div>

          <a href="dashboard.html" class="dropdown-link" role="menuitem">
            <span>📊</span> Member Dashboard
          </a>
          <a href="books.html" class="dropdown-link" role="menuitem">
            <span>📚</span> Browse eLibrary
          </a>
          <a href="membership-checkout.html" class="dropdown-link" role="menuitem">
            <span>⚡</span> Membership &amp; Plan
          </a>
          <div class="dropdown-divider"></div>
          <button type="button" class="dropdown-link sign-out-link" id="headerSignOutBtn" role="menuitem">
            <span>🚪</span> Sign Out
          </button>
        </div>
      </div>
    `;

    // Dropdown toggle logic
    const profileBtn = document.getElementById('userProfileBtn');
    const dropdownMenu = document.getElementById('userDropdownMenu');

    if (profileBtn && dropdownMenu) {
      profileBtn.onclick = function (e) {
        e.stopPropagation();
        const isOpen = dropdownMenu.classList.toggle('show');
        profileBtn.classList.toggle('active', isOpen);
        profileBtn.setAttribute('aria-expanded', isOpen);
      };

      document.addEventListener('click', function (e) {
        if (!dropdownMenu.contains(e.target) && !profileBtn.contains(e.target)) {
          dropdownMenu.classList.remove('show');
          profileBtn.classList.remove('active');
          profileBtn.setAttribute('aria-expanded', 'false');
        }
      });
    }

    // Gender Switcher buttons
    document.querySelectorAll('.gender-pill').forEach(btn => {
      btn.onclick = function (e) {
        e.stopPropagation();
        const targetGender = this.dataset.g;
        user.gender = targetGender;
        localStorage.setItem('b36_user', JSON.stringify(user));
        window.initBridgewayHeaderAuth();
      };
    });

    // Sign out button
    const signOutBtn = document.getElementById('headerSignOutBtn');
    if (signOutBtn) {
      signOutBtn.onclick = function (e) {
        e.preventDefault();
        localStorage.removeItem('b36_user');
        window.initBridgewayHeaderAuth();
        if (typeof showToast === 'function') {
          showToast('✓ Signed out successfully.');
        } else {
          window.location.reload();
        }
      };
    }

    // Update Mobile Drawer
    updateMobileDrawer(user, firstName, fullName, gender, avatarSvg);
  };

  function updateMobileDrawer(user, firstName, fullName, gender, avatarSvg) {
    const drawer = document.getElementById('mobileDrawer') || document.querySelector('.mobile-drawer');
    if (!drawer) return;

    let authStack = drawer.querySelector('.mobile-auth-stack');
    if (!authStack) {
      // Find the existing sign in/register buttons container in drawer
      const links = drawer.querySelectorAll('a[href*="login.html"]');
      if (links.length > 0) {
        authStack = links[0].parentElement;
        authStack.classList.add('mobile-auth-stack');
      }
    }
    if (!authStack) return;

    if (!user) {
      authStack.innerHTML = `
        <a href="login.html" class="btn secondary" style="width: 100%; text-align: center; justify-content: center; padding: 11px;" onclick="closeMobileMenu()">Sign In</a>
        <a href="login.html#register" class="btn primary" style="width: 100%; text-align: center; justify-content: center; padding: 11px; background: var(--navy); color: #fff;" onclick="closeMobileMenu()">Register</a>
      `;
      return;
    }

    authStack.innerHTML = `
      <div class="mobile-user-card">
        <div class="user-avatar-wrap">
          ${avatarSvg}
        </div>
        <div class="mobile-user-details">
          <span class="mobile-user-name">${fullName}</span>
          <span class="mobile-user-status">✓ Signed In Member</span>
        </div>
      </div>
      <button type="button" class="btn secondary" style="width: 100%; text-align: center; justify-content: center; padding: 11px; color:#c53030; border-color:#feb2b2;" onclick="localStorage.removeItem('b36_user'); window.initBridgewayHeaderAuth(); closeMobileMenu();">Sign Out</button>
    `;
  }

  // Initialize on DOM ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', window.initBridgewayHeaderAuth);
  } else {
    window.initBridgewayHeaderAuth();
  }
})();
