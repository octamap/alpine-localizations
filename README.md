# **alpine-localizations**  

**A simple localization utility for Alpine.js applications.**  

This package helps you add localization support to your Alpine.js project by dynamically loading language files and providing a convenient `$t` magic property for translations.


## 🛠️ **Usage**

### **1. Load Localization Files**  

`alpine-localizations` will automatically fetch the appropriate localization file based on the user's browser language (`navigator.language`).

For example, if `navigator.language` is `en-US`, it will attempt to fetch:
```
/localizations/en-US.json
```

### **2. Access Translations with `$t`**

Use the `$t` magic property to reference localization keys in your Alpine.js components:

```html
<div x-data>
    <h1 x-text="$t.greeting"></h1>
    <input type="text" :placeholder="$t.welcome">
</div>
```

If the translation key (`greeting` or `welcome`) exists in your localization file, it will be displayed. Otherwise, the key itself will be shown as a fallback.


### 3. Default language 
You don’t need to create a localization file for the default language of your website.

By default, the package will attempt to extract content directly from the `x-text` or `:placeholder` attributes:

```html
<input :placeholder="$t.email" placeholder="example@mail.com">
```

- The value of the placeholder attribute (example@mail.com) will be shown instantly as the default.
- Once another localization file is loaded, the content will be updated dynamically.

This approach minimizes flickering and ensures that users always see meaningful content, even before localization files are fully loaded.

---

## 🚀 **Setup**

### **CDN Integration**  

Add the script link for `alpine-localizations` **before** Alpine.js:

```html
<!-- Add alpine-localizations -->
<script src="https://cdn.jsdelivr.net/npm/@octamap/alpine-localizations@1" defer></script>

<!-- Add Alpine.js -->
<script src="https://cdn.jsdelivr.net/npm/alpinejs@3.x.x/dist/cdn.min.js" defer></script>
```

This ensures the localization store and `$t` magic property are available when Alpine initializes.

---

## 📁 **Define Localizations**

Localization files are expected to be in your **static folder** (e.g., `public/localizations`) and named based on the browser's language code.

Example folder structure:

```
/public
  /localizations
    en-US.json
    fr-FR.json
```

### **Example Localization File (`en-US.json`)**
```json
{
  "greeting": "Hello, World!",
  "welcome": "Welcome, {{name}}!"
}
```


## 📝 **Dynamic Content Example**

```html
<div x-data="{ name: 'John' }">
    <p x-text="$t.welcome.replace('{{name}}', name)"></p>
</div>
```

- Localization Key: `"welcome": "Welcome, {{name}}!"`  
- Output: **"Welcome, John!"**

## 📦 **API Reference**

### `$t` Magic Property

- **Purpose:** Access localization keys.
- **Behavior:** Looks for the key in the Alpine store and gracefully falls back to element attributes (`x-text`, `:placeholder`) if the key isn't found.

---

## 🌍 **Localization File Fetching**

- **Default Path:** `/localizations/`
- **File Naming:** Must match the `navigator.language` value (`en-US.json`, `fr-FR.json`, etc.).
- **Response Format:** Must be valid JSON.

---

## ✅ **Best Practices**

- Always ensure valid JSON in your localization files.
- Provide fallback text using `x-text` or `:placeholder` attributes.
- Avoid large localization files to minimize load times.

---

## 🐞 **Debugging**

- Open your browser's **Network tab** to verify the localization file (`/localizations/{lang}.json`) is being fetched correctly.
- Check the **Console** for errors in fetching or parsing JSON files.

---

## 🤝 **Contributing**

Feel free to submit issues or pull requests on the [GitHub Repository](https://github.com/octamap/alpine-localizations).

1. Fork the repository.
2. Create a new branch: `git checkout -b feature/new-feature`.
3. Make your changes.
4. Submit a pull request.

---

## 📜 **License**

This project is licensed under the **MIT License**. See the [LICENSE](./LICENSE) file for details.

---

**Happy Coding! 🚀**