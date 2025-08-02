Here’s a polished, professional version of your responsive UI guidelines, formatted for a markdown file:

---

# Responsive UI Guidelines for React Native

## 🎯 Goals

- **Responsive Design:**  
  Ensure all UI components adapt gracefully to various screen sizes, including phones, tablets, and foldable devices.
- **Project Structure:**  
  Maintain the existing file organization, component breakdown, and overall project architecture.
- **No Inline Styles:**  
  All styles must be defined using `StyleSheet.create()` or placed in external style modules—**never** use inline styles.

## 🔧 Technical Requirements

- **Responsive Sizing:**  
  Use React Native’s `Dimensions`, `useWindowDimensions`, or utility helpers (e.g., `wp`, `hp`) to scale sizes responsively.
- **Flexbox Layout:**  
  Leverage flexbox properties (`flex`, `alignItems`, `justifyContent`, etc.) for layout and alignment.  
  **Avoid** hardcoded margins and absolute positioning.
- **Scalable Elements:**  
  All font sizes, padding, spacing, and image dimensions must scale based on screen size.
- **Code Quality:**  
  Ensure all code is clean, readable, and consistent with the project’s existing architecture and conventions.

## 📦 Example Workflow

1. **Identify** the component or screen requiring responsive adjustments.
2. **Review** its current styles file (or create one if it doesn’t exist).
3. **Replace** hardcoded values with responsive equivalents using the appropriate utilities.
4. **Extract** any inline styles into the styles object or external styles file.
5. **Test** the component on multiple screen sizes to verify responsiveness.

## 📌 Output Requirements

- Updated component(s) with fully responsive styles.
- **No inline styles**—all styles extracted appropriately.
- Adherence to the existing file structure and code organization.
- Code that is reusable, maintainable, and easy to extend.

---

You can copy and paste this directly into your `context.md` or any other documentation file in your project.