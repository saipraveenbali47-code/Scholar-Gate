/**
 * SCHOLAR GATE - LocalStorage Manager
 * Safely persists demo bookmarks, document checklist progress, and language settings locally.
 */

const StorageKeys = {
  BOOKMARKS: 'scholargate_bookmarks',
  CHECKLISTS: 'scholargate_checklists',
  LANGUAGE: 'scholargate_lang',
  ACTIVE_PROFILE: 'scholargate_active_profile',
  CUSTOM_SCHOLARSHIPS: 'scholargate_custom_scholarships'
};

const StorageService = {
  /**
   * Retrieves bookmarked scholarship IDs
   * @returns {string[]}
   */
  getBookmarks() {
    try {
      const data = localStorage.getItem(StorageKeys.BOOKMARKS);
      return data ? JSON.parse(data) : [];
    } catch (e) {
      console.warn('Storage read failed for bookmarks', e);
      return [];
    }
  },

  /**
   * Toggles bookmark state for a scholarship ID
   * @param {string} scholarshipId 
   * @returns {boolean} True if now bookmarked, False if removed
   */
  toggleBookmark(scholarshipId) {
    try {
      const bookmarks = this.getBookmarks();
      const index = bookmarks.indexOf(scholarshipId);
      let isBookmarked = false;

      if (index > -1) {
        bookmarks.splice(index, 1);
        isBookmarked = false;
      } else {
        bookmarks.push(scholarshipId);
        isBookmarked = true;
      }

      localStorage.setItem(StorageKeys.BOOKMARKS, JSON.stringify(bookmarks));
      return isBookmarked;
    } catch (e) {
      console.warn('Storage write failed for bookmarks', e);
      return false;
    }
  },

  /**
   * Checks if an ID is bookmarked
   * @param {string} scholarshipId 
   * @returns {boolean}
   */
  isBookmarked(scholarshipId) {
    const bookmarks = this.getBookmarks();
    return bookmarks.includes(scholarshipId);
  },

  /**
   * Retrieves checklist progress for a specific scholarship
   * @param {string} scholarshipId 
   * @returns {Object.<number, boolean>}
   */
  getChecklist(scholarshipId) {
    try {
      const allChecklists = JSON.parse(localStorage.getItem(StorageKeys.CHECKLISTS) || '{}');
      return allChecklists[scholarshipId] || {};
    } catch (e) {
      console.warn('Storage read failed for checklist', e);
      return {};
    }
  },

  /**
   * Updates state for a single checklist item
   * @param {string} scholarshipId 
   * @param {number} itemIndex 
   * @param {boolean} isChecked 
   */
  setChecklistItem(scholarshipId, itemIndex, isChecked) {
    try {
      const allChecklists = JSON.parse(localStorage.getItem(StorageKeys.CHECKLISTS) || '{}');
      if (!allChecklists[scholarshipId]) {
        allChecklists[scholarshipId] = {};
      }
      allChecklists[scholarshipId][itemIndex] = isChecked;
      localStorage.setItem(StorageKeys.CHECKLISTS, JSON.stringify(allChecklists));
    } catch (e) {
      console.warn('Storage write failed for checklist item', e);
    }
  },

  /**
   * Resets checklist progress for a specific scholarship
   * @param {string} scholarshipId 
   */
  resetChecklist(scholarshipId) {
    try {
      const allChecklists = JSON.parse(localStorage.getItem(StorageKeys.CHECKLISTS) || '{}');
      delete allChecklists[scholarshipId];
      localStorage.setItem(StorageKeys.CHECKLISTS, JSON.stringify(allChecklists));
    } catch (e) {
      console.warn('Storage reset failed for checklist', e);
    }
  },

  /**
   * Gets preferred language ('en' or 'te')
   * @returns {string}
   */
  getLanguage() {
    try {
      return localStorage.getItem(StorageKeys.LANGUAGE) || 'en';
    } catch (e) {
      return 'en';
    }
  },

  /**
   * Sets preferred language
   * @param {string} lang 
   */
  setLanguage(lang) {
    try {
      localStorage.setItem(StorageKeys.LANGUAGE, lang);
    } catch (e) {
      console.warn('Storage write failed for language', e);
    }
  },

  /**
   * Saves current active student profile
   * @param {object} profile 
   */
  saveActiveProfile(profile) {
    try {
      localStorage.setItem(StorageKeys.ACTIVE_PROFILE, JSON.stringify(profile));
    } catch (e) {}
  },

  /**
   * Loads saved active student profile
   * @returns {object|null}
   */
  getActiveProfile() {
    try {
      const data = localStorage.getItem(StorageKeys.ACTIVE_PROFILE);
      return data ? JSON.parse(data) : null;
    } catch (e) {
      return null;
    }
  },

  /**
   * Clears saved profile
   */
  clearActiveProfile() {
    try {
      localStorage.removeItem(StorageKeys.ACTIVE_PROFILE);
    } catch (e) {}
  }
};
