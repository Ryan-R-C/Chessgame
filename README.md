# Developer Chess Game

## Game Screenshots

See below for some screenshots of the game in action:

1. **Board Options**
   ![Board Options](docs/1game_option.png)

2. **Initial Board**
   ![Initial Board](docs/2chess_game.png)

3. **Game Running**
   ![Game Running](docs/3_chess_game_running.png)

4. **Victory Screen**
   ![Victory Screen](docs/4_victory.png)

---

## Rules

### **1 – The board**

The game board can have custom dimensions defined by the user before the game starts. The board dimensions must be between 6 and 12 squares (vertically and horizontally).

For example:

* 6×6 is allowed
* 6×8 is allowed
* 6×12 is allowed
* 12×12 is allowed
* 10×7 is allowed
* 13×6 is NOT allowed
* 5×6 is NOT allowed

---

### **2 – The pieces**

#### **The "Developer"**

**Movement**

* Can jump up to 3 squares per turn
* Can jump to any direction (vertical, horizontal, or diagonal)

**Capture**

* Captures other pieces by jumping above them
* Can NOT jump to squares that are already occupied

#### **The "Designer"**

**Movement**

* Can jump in an "L" shape

**Capture**

* Captures other pieces by moving on top of them

#### **The "Product Owner"**

**Movement**

* Can move one square per turn
* Can move to any direction (vertical, horizontal, or diagonal)

**Capture**

* Captures other pieces by moving on top of them

---

### **3 – Initial piece position**

This is how you calculate the initial position of each piece:

* **🛡️ black Product Owner**
  Starts in the top right corner

* **🧱 black Developer**
  Starts at the left of the black Product Owner

* **🎨 black Designer**
  Starts at the left of the black Developer

* **🛡️ white Product Owner**
  Starts in the bottom left corner

* **🧱 white Developer**
  Starts at the right of the white Product Owner

* **🎨 white Designer**
  Starts at the right of the white Developer

---

### **4 – How to play**

* The first turn is for the **white**
* To win the game you must capture the **"Product Owner"** of your adversary

---

## Code Structure and Main Components

The project is organized as follows:

- **src/components/**
  - `Board.tsx`: Renders the board, pieces, and highlights valid moves.
  - `Game.tsx`: Handles the main game state, turn logic, piece selection, and victory detection.
  - `BoardSetup.tsx`: Lets the user choose the board size (between 6x6 and 12x12) and initializes the pieces in the correct positions.
  - `VictoryModal.tsx`: Modal displayed at the end of the game, showing the winner and options to restart or return home.
  - `gameUtils.ts`: Utility functions for identifying piece type and color.

- **src/game/**
  - `boardLogic.ts`: Implements the movement rules for each piece (Developer, Designer, Product Owner) and helper functions for game logic.

- **src/app/**
  - `page.tsx`: Main entry point of the application. Manages the display of the board setup and the game itself.

- **src/assets/**
  - `button.css`: Custom button styles.

---

## How the Code Works

- The user defines the board size on the initial screen.
- Pieces are automatically positioned according to the rules.
- The `Game` component manages all gameplay logic, including turn switching and move validation.
- The board is rendered by the `Board` component, which also highlights valid moves and selected pieces.
- When a player captures the opponent's Product Owner, the victory modal is displayed.

---
