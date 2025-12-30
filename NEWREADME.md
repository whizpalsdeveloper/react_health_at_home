# ES3TV - Dr. Now TV Application

This project is a TV application designed for high-resolution displays, providing users with health and movement-related content, specifically curated by Dr. Nowzaradan. The application features a rich, interactive UI suitable for remote control navigation.

## Project Features

### 1. Main Navigation Screen
- **Feature Selection**: Users can choose between different content modules, such as "Movement" and "Prescription".
- **Dynamic Backgrounds**: The background changes based on the selected feature, providing a premium visual experience.
- **Visual Feedback**: Interactive cursor and hover states tailored for TV remote navigation.

### 2. Movement Module
- **Mandatory Disclaimer**: Before accessing movement routines, users must view and acknowledge a physical activity disclaimer.
- **Category Carousel**: A smooth, horizontal scrolling carousel to browse through different movement categories (e.g., Stretching, Cardio, Strength).
- **Hero Sections**: Dynamic updates of titles and descriptions as users navigate through categories.

### 3. Prescription Module
- **Information Portal**: Provides health-related prescriptions and advice from Dr. Now.
- **Educational Content**: Focused on user education and health guidelines.

### 4. Subcategory & Video Grid
- **Master-Detail Layout**: Subcategories are listed on the left, while the corresponding videos are displayed in a responsive grid on the right.
- **Video Previews**: Each grid item includes a thumbnail, title, and duration.
- **Smooth Navigation**: Users can easily move focus between the list and the grid using remote directional keys.

### 5. Advanced Video Player
- **Custom Controls**: A premium playback interface with Play/Pause, Fast Forward, and Rewind capabilities.
- **Progress Tracking**: Real-time scrubber and timecode display.
- **Auto-Hide Controls**: UI elements automatically hide during playback to provide an immersive viewing experience.
- **Screen Saver Interaction**: Prevents the screen from dimming or sleeping during active video playback.

---

## Detailed Navigation Flow

Follow this flow to understand how a user moves through the application:

1.  **App Launch (Main Screen)**:
    *   The user starts on the **Main Screen**.
    *   *Action*: Select **"Movement"** button.
    *   *Navigation*: Moves to **Movement Screen**.

2.  **Movement Screen (Disclaimer First)**:
    *   The application shows the **Disclaimer (Intro View)** as an overlay.
    *   *Action*: User selects **"Continue"**.
    *   *Navigation*: The overlay hides, and focus moves to the **Category Carousel**.
    *   *Action*: Select a specific category (e.g., "Full Body").
    *   *Navigation*: Moves to **Subcategory Screen**.

3.  **Subcategory Screen**:
    *   The user sees a list of **Subcategories** on the left.
    *   *Action*: Navigate through subcategories. This dynamically updates the **Video Grid** on the right.
    *   *Action*: Move focus to the right into the **Video Grid** and select a video.
    *   *Navigation*: Moves to **Video Player Screen**.

4.  **Video Player**:
    *   The selected video starts playing automatically.
    *   *Action*: Press **"Back"** button.
    *   *Navigation*: Returns to the **Subcategory Screen**.

5.  **Prescription Screen (From Main Screen)**:
    *   *Action*: On **Main Screen**, select **"Prescription"**.
    *   *Navigation*: Shows the **Disclaimer (Intro View)** followed by the **Prescription Screen**.
    *   *Action*: Press **"Back"** button.
    *   *Navigation*: Returns to the **Main Screen**.

---

## Recommendations for React Implementation

To recreate this project using React, consider the following architecture:

### 1. State Management
- Use `React Context` or `Zustand` to manage the currently active screen and user focus state.
- Implement a global `NavigationProvider` to handle remote control key events (Up, Down, Left, Right, Enter, Back).

### 2. Components
- **ScreenContainer**: A wrapper that handles routing/conditional rendering of screens.
- **RemoteButton**: A base component for all focusable items that handles the `focused` style.
- **Carousel**: Use `Framer Motion` for smooth transitions between categories.
- **VideoGrid**: A memoized grid component to handle large sets of video items efficiently.

### 3. Video Playback
- Use `react-player` or the native `<video>` tag.
- Implement a custom hook `useVideoControls` to manage play/pause states and the auto-hiding UI logic.

### 4. Routing
- While standard React Router works, for a TV app, a simple state-based conditional rendering (e.g., `activeScreen === 'MAIN'`) is often more reliable to maintain focus state across transitions.

---

## Technical Stack (Original)
- **Engine**: Node.js
- **Templates**: DustJs
- **Build System**: Webpack
- **Assets**: Styled using SASS with dynamic skins.
