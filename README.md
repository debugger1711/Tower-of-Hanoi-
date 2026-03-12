# 🗼 Tower of Hanoi Visualizer

An interactive **Tower of Hanoi Visualizer** that demonstrates the classic recursion problem in computer science.  
This web application visually shows how disks move between rods while following the rules of the Tower of Hanoi puzzle.

🔗 **Live Demo:**  
https://tower-of-hanoi-tawny.vercel.app/

---

## 📌 About the Project

The **Tower of Hanoi** is a mathematical puzzle consisting of **three rods and multiple disks of different sizes**.  
The objective is to move all disks from the **source rod** to the **destination rod** using an **auxiliary rod**.

### Rules of the Puzzle
1. Only **one disk can be moved at a time**
2. A **larger disk cannot be placed on a smaller disk**
3. Only the **top disk of a rod can be moved**

This project visually demonstrates how the **recursive algorithm** solves the puzzle step by step.

---

## ✨ Features

- 🎮 Interactive Tower of Hanoi simulation  
- 📊 Visual representation of rods and disks  
- 🔁 Demonstrates recursive algorithm logic  
- ⚡ Smooth disk movement animations  
- 📱 Responsive user interface  
- 🌐 Deployed using **Vercel**

---

## 🧠 Algorithm Used

The solution uses the **recursive approach**.

### Recursive Logic

To move **n disks** from **Source → Destination**:

1. Move n - 1 disks from **Source → Auxiliary**
2. Move the **nth disk** from **Source → Destination**
3. Move n - 1 disks from **Auxiliary → Destination**

### Recurrence Relation
T(n) = 2T(n - 1) + 1

### Time Complexity:  O(2^n)

### Minimum Number of Moves: 2^n - 1


---

## 🖥️ Tech Stack

- **HTML5**
- **CSS3**
- **JavaScript**
- **Vercel** (Deployment)

---

## 📂 Project Structure
tower-of-hanoi
│
├── index.html
├── style.css
├── script.js
└── README.md


---

## 🚀 Getting Started

### Clone the Repository
git clone https://github.com/your-username/tower-of-hanoi.git

### Navigate to the Project Folder
cd tower-of-hanoi


### Run the Project

Open the `index.html` file in your browser.

---

## 🎯 Learning Objectives

This project helps in understanding:

- Recursion
- Algorithm visualization
- Problem solving techniques
- DOM manipulation with JavaScript
- Interactive UI design

---

## 🔮 Future Improvements

- Add step-by-step explanation
- Add animation speed control
- Show recursive call stack visualization
- Add manual play mode
- Display move counter

---

## 👨‍💻 Author

**Vishal Kumar**

---

## ⭐ Support

If you like this project, please consider giving it a **star ⭐ on GitHub**.
