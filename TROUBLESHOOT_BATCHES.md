# 🔧 Batches Not Loading - Diagnostic Guide

## Problem
Batches are not showing in the grid on `index.html`, but `test-api.html` works.

---

## Solution Steps

### Step 1: Check the Debug Console

Open `debug.html` in your browser:
```
http://localhost:8000/debug.html
```

**Click buttons to test:**
1. 🧪 **Test Debug Endpoint** - Should show API is working
2. 📚 **Test Batches** - Should show batch data

**What to look for:**
- ✅ Both tests should show green "SUCCESS"
- ❌ If they show red "FAILED" or "ERROR", note the error message

---

### Step 2: Check Browser Console (F12)

1. Open `http://localhost:8000/index.html`
2. Press `F12` to open Developer Tools
3. Go to **Console** tab
4. Look for messages like:
   - 🔧 "API Endpoint: ./api.php" (Should appear)
   - 📚 "Loading batches from: ./api.php/batches" (Should appear)
   - 📡 "Response status: 200 OK" (Should appear)
   - ✅ "Batches loaded: X items" (Should appear - X should be > 0)

**If you see errors:**
- Note the exact error message
- Take a screenshot
- Check the error details

---

### Step 3: Check Network Tab

1. In Developer Tools, go to **Network** tab
2. Reload the page (F5)
3. Look for requests to:
   - `api.php` or `./api.php/batches`

**For each request, check:**
| Item | Should Be |
|------|-----------|
| Status | 200 |
| Type | fetch |
| Response | Should contain "success": true |

If you see:
- 404 → File not found
- 500 → Server error
- CORS error → Cross-origin issue

---

### Step 4: Common Problems & Solutions

#### Problem: Status 404 or "Cannot GET /api.php"
**Solution:** Make sure `api.php` is in the same directory as `index.html`
```
Correct path: C:\Users\TUTU KUMAR\Downloads\...\unacademy.therankforge.site\api.php
Verify by running: php -l api.php
```

#### Problem: Status 500 error
**Solution:** Check PHP error log
```bash
# Linux/Mac
tail -f /var/log/php-errors.log

# Windows - check in debug.html console for more details
```

#### Problem: Response is empty or null
**Solution:** External API might be down. Test directly:
```bash
curl https://api.thescholarverse.site/unacademy/batches
```

#### Problem: "API is not defined" in console
**Solution:** Ensure scripts load in correct order in index.html:
1. `icons.js` must load first
2. API setup script comes next
3. `app.js` comes last

---

### Step 5: Test with Different URLs

Edit the API URL in `debug.html`:

**Option A: Use relative path**
```
./api.php
```

**Option B: Use absolute path**
```
http://localhost:8000/api.php
```

**Option C: Test external API directly**
```
https://api.thescholarverse.site/unacademy/batches
```

Try each one and note which works.

---

### Step 6: Check PHP Setup

```bash
# Verify PHP is running
php -v

# Verify cURL extension is enabled
php -m | grep curl

# Test api.php directly
php api.php
```

Expected output should be JSON with "success": true

---

## Quick Fixes

### Fix 1: Restart PHP Server
```bash
# Stop current server (Ctrl+C)
# Start new server
php -S localhost:8000
```

### Fix 2: Clear Browser Cache
- Press `Ctrl+Shift+Delete` (Windows)
- Or go to Settings → Clear Browsing Data
- Clear "Cached images and files"

### Fix 3: Clear SessionStorage
Open Console (F12) and type:
```javascript
sessionStorage.clear()
location.reload()
```

### Fix 4: Check API Endpoint Format
Click in Console and type:
```javascript
console.log(API)
console.log(_e._b)
console.log(API + '/' + _e._b)
```

Should show:
```
./api.php
batches
./api.php/batches
```

---

## If Still Not Working

### Step A: Copy this test code into Console (F12)

```javascript
// Test 1: Check if fetch works
fetch('./api.php/batches')
  .then(r => {
    console.log('Status:', r.status);
    return r.json();
  })
  .then(d => {
    console.log('Response:', d);
    if (d.data && d.data.batches) {
      console.log('✅ Batches found:', d.data.batches.length);
    } else {
      console.log('❌ No batches in response');
      console.log('Response structure:', Object.keys(d));
    }
  })
  .catch(e => console.error('❌ Fetch failed:', e));
```

### Step B: Check error logs

If you're on Linux/Mac:
```bash
# Check PHP error log
php -S localhost:8000 2>&1 | tail -20

# Run with errors shown
php -d display_errors=1 -S localhost:8000
```

### Step C: Test with curl

```bash
curl -v http://localhost:8000/api.php/batches
```

Look at headers and response body.

---

## Final Checklist

Before reporting issue, verify:

- [ ] PHP server is running (`php -S localhost:8000` in terminal)
- [ ] `api.php` file exists in project directory
- [ ] No errors in browser console (F12)
- [ ] Network tab shows response status 200 (not 404/500)
- [ ] Response JSON contains "success": true
- [ ] Response has "data.batches" array with items
- [ ] Tested with `debug.html` and got SUCCESS
- [ ] Cleared browser cache and sessionStorage
- [ ] Used `./api.php` (relative path) not `api.php`

---

## Quick Test

**Fastest way to test if everything works:**

1. Open terminal/PowerShell
2. Navigate to project folder
3. Type: `php -S localhost:8000`
4. Open browser to: `http://localhost:8000/debug.html`
5. Click "🧪 Test Debug Endpoint"
6. Should see green "✓ SUCCESS"

If this works, the API is fine. Problem is with how index.html is loading.

---

## Need More Help?

**Save the following information:**

1. **Error message from console (F12)**
2. **Network tab screenshot** showing api.php request
3. **Response from debug.html** - Test Debug output
4. **PHP version**: `php -v`
5. **cURL status**: `php -m | grep curl`

This will help diagnose the exact issue.

---

**Created:** June 2, 2026  
**Updated with debugging tools and error logging**

