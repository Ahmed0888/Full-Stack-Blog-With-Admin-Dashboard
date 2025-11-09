// const API_BASE = "http://localhost:3000/api";

// function showLogin() {
//   document.getElementById("formTitle").innerText = "Login Form";
//   document.getElementById("loginForm").classList.remove("hidden");
//   document.getElementById("signupForm").classList.add("hidden");
//   document.getElementById("btn").style.left = "0px";
// }

// function showSignup() {
//   document.getElementById("formTitle").innerText = "Signup Form";
//   document.getElementById("signupForm").classList.remove("hidden");
//   document.getElementById("loginForm").classList.add("hidden");
//   document.getElementById("btn").style.left = "110px";
// }

// async function handleSignup() {
//   const name = document.getElementById("signupUsername").value.trim();
//   const email = document.getElementById("signupEmail").value.trim();
//   const password = document.getElementById("signupPassword").value.trim();
//   const confirmPassword = document
//     .getElementById("signupConfirmPassword")
//     .value.trim();
//   const message = document.getElementById("signupMessage");

//   message.innerText = "";
//   message.style.color = "red";

//   if (!name || !email || !password || !confirmPassword) {
//     message.innerText = "All fields are required!";
//     return;
//   }
//   if (password !== confirmPassword) {
//     message.innerText = "Passwords do not match!";
//     return;
//   }

//   try {
//     const res = await axios.post(`${API_BASE}/signup`, {
//       name,
//       email,
//       password,
//     });
//     message.style.color = "green";
//     message.innerText = res.data.message || "Signup successful!";
//     setTimeout(showLogin, 1000);
//   } catch (err) {
//     message.innerText = err.response?.data?.message || "Signup failed!";
//   }
// }

// async function handleLogin() {
//   const email = document.getElementById("loginEmail").value.trim();
//   const password = document.getElementById("loginPassword").value.trim();
//   const message = document.getElementById("loginMessage");

//   message.innerText = "";
//   message.style.color = "red";

//   if (!email || !password) {
//     message.innerText = "Please enter both fields!";
//     return;
//   }

//   try {
//     const res = await axios.post(`${API_BASE}/login`, { email, password });
//     localStorage.setItem("loggedInUser", JSON.stringify(res.data.user));
//     message.style.color = "green";
//     message.innerText = "Login successful! Redirecting...";
//     setTimeout(() => {
//       window.location.href = "dashboard.html";
//     }, 900);
//   } catch (err) {
//     message.innerText = err.response?.data?.message || "Login failed!";
//   }
// }

// document.addEventListener("DOMContentLoaded", () => {
//   document.getElementById("tabLogin").addEventListener("click", showLogin);
//   document.getElementById("tabSignup").addEventListener("click", showSignup);
//   document.getElementById("linkToSignup").addEventListener("click", showSignup);

//   document.getElementById("signupForm").addEventListener("submit", (e) => {
//     e.preventDefault();
//     handleSignup();
//   });

//   document.getElementById("loginForm").addEventListener("submit", (e) => {
//     e.preventDefault();
//     handleLogin();
//   });
// });

// function logout() {
//   localStorage.removeItem("loggedInUser");
//   window.location.href = "index.html";
// }

// function displayDashboardUser() {
//   const raw = localStorage.getItem("loggedInUser");
//   if (!raw) return;
//   const user = JSON.parse(raw);
//   const nameEl = document.getElementById("usernameDisplay");
//   if (nameEl) nameEl.innerText = user.name || "User";
// }

// async function fetchBlogs() {
//   const loggedUser = JSON.parse(localStorage.getItem("loggedInUser") || "{}");
//   const userId = loggedUser._id;
//   const blogsContainer = document.getElementById("blogsContainer");
//   const totalBlogs = document.getElementById("totalBlogs");

//   if (!userId) return;

//   try {
//     const res = await axios.get(`${API_BASE}/blogs/${userId}`);
//     const blogs = res.data.blogs || [];

//     blogsContainer.innerHTML = "";
//     totalBlogs.innerText = blogs.length;

//     if (blogs.length === 0) {
//       blogsContainer.innerHTML = "<p>No blogs yet. Add your first one!</p>";
//       return;
//     }

//     blogs.forEach((blog) => {
//       const blogDiv = document.createElement("div");
//       blogDiv.classList.add("blog-card");
//       blogDiv.innerHTML = `
//         <h3>${blog.title}</h3>
//         <p>${blog.content}</p>
//         <div class="actions">
//           <button class="edit-btn" onclick="editBlog('${blog._id}', '${blog.title}', \`${blog.content}\`)">✏️ Edit</button>
//           <button class="delete-btn" onclick="deleteBlog('${blog._id}')">🗑️ Delete</button>
//         </div>
//       `;
//       blogsContainer.appendChild(blogDiv);
//     });
//   } catch (err) {
//     console.error(err);
//     blogsContainer.innerHTML = "<p>Failed to load blogs.</p>";
//   }
// }

// // message.style.color = "green";
// // message.innerText = "Blog added successfully!";

// //  Add Blog (safe DOM creation, send userId)
// // -----------------------------
// async function handleAddBlog(e) {
//   e.preventDefault();

//   const titleEl = document.getElementById("blogTitle");
//   const contentEl = document.getElementById("blogContent");
//   const message = document.getElementById("blogMessage");
//   const raw = localStorage.getItem("loggedInUser");

//   if (!raw) {
//     alert("Please login first!");
//     return;
//   }

//   const loggedUser = JSON.parse(raw);
//   const userId = loggedUser._id;

//   const title = titleEl.value.trim();
//   const content = contentEl.value.trim();

//   if (!title || !content) {
//     if (message) {
//       message.style.color = "red";
//       message.innerText = "Please fill out all fields!";
//     }
//     return;
//   }

//   try {
//     const res = await axios.post(`${API_BASE}/blogs`, {
//       title,
//       content,
//       author: loggedUser.name,
//       userId,
//     });

//     const blog = res.data.blog;
//     // create DOM node (consistent with fetchBlogs)
//     const blogsContainer = document.getElementById("blogsContainer");
//     if (blogsContainer) {
//       const blogDiv = document.createElement("div");
//       blogDiv.className = "blog-card";
//       blogDiv.id = `blog-${blog._id}`;

//       const h3 = document.createElement("h3");
//       h3.textContent = blog.title;

//       const p = document.createElement("p");
//       p.textContent = blog.content;

//       const actions = document.createElement("div");
//       actions.className = "actions";

//       const editBtn = document.createElement("button");
//       editBtn.className = "edit-btn";
//       editBtn.textContent = " Edit";
//       editBtn.addEventListener("click", () =>
//         editBlog(blog._id, blog.title, blog.content)
//       );

//       const delBtn = document.createElement("button");
//       delBtn.className = "delete-btn";
//       delBtn.textContent = " Delete";
//       delBtn.addEventListener("click", () => deleteBlog(blog._id));

//       actions.appendChild(editBtn);
//       actions.appendChild(delBtn);

//       blogDiv.appendChild(h3);
//       blogDiv.appendChild(p);
//       blogDiv.appendChild(actions);

//       // prepend so newest appears first
//       blogsContainer.prepend(blogDiv);
//     }

//     // reset fields
//     titleEl.value = "";
//     contentEl.value = "";

//     // update total count safely
//     const totalBlogs = document.getElementById("totalBlogs");
//     if (totalBlogs) {
//       totalBlogs.innerText = parseInt(totalBlogs.innerText || "0", 10) + 1;
//     }

//     if (message) {
//       message.style.color = "green";
//       message.innerText = res.data.message || "Blog added successfully!";
//       setTimeout(() => {
//         message.innerText = "";
//       }, 1500);
//     }
//   } catch (err) {
//     console.error("Error adding blog:", err);
//     if (message) {
//       message.style.color = "red";
//       message.innerText = err.response?.data?.message || "Error adding blog!";
//     } else {
//       alert("Error adding blog!");
//     }
//   }
// }

// // Delete Blog (optimistic UI remove, restore on error)

// async function deleteBlog(blogId) {
//   if (!confirm("Are you sure you want to delete this blog?")) return;

//   const blogEl = document.getElementById(`blog-${blogId}`);
//   const totalEl = document.getElementById("totalBlogs");

//   if (!blogEl) {
//     try {
//       await axios.delete(`${API_BASE}/blogs/${blogId}`);
//       fetchBlogs();
//     } catch (err) {
//       console.error("Delete fallback failed:", err);
//       alert("Error deleting blog!");
//     }
//     return;
//   }

//   // Backup to restore if delete fails
//   const parent = blogEl.parentNode;
//   const nextSibling = blogEl.nextSibling;
//   const backup = blogEl.cloneNode(true);

//   // remove and update lister
//   blogEl.remove();
//   if (totalEl) {
//     const newCount = Math.max(0, parseInt(totalEl.innerText || "0", 10) - 1);
//     totalEl.innerText = newCount;
//   }

//   try {
//     await axios.delete(`${API_BASE}/blogs/${blogId}`);

//   } catch (err) {
//     // restore on error
//     if (parent) {
//       if (nextSibling) parent.insertBefore(backup, nextSibling);
//       else parent.appendChild(backup);
//     }
//     if (totalEl) {
//       totalEl.innerText = parseInt(totalEl.innerText || "0", 10) + 1;
//     }
//     console.error("Delete failed:", err);
//     alert("Error deleting blog! It has been restored in the UI.");
//   }
// }

// //  Edit Blog (prompt edit, update UI without full reload)

// async function editBlog(id, oldTitle, oldContent) {
//   const newTitle = prompt("Edit Title:", oldTitle);
//   const newContent = prompt("Edit Content:", oldContent);

//   if (newTitle === null || newContent === null) return; // user cancelled

//   const trimmedTitle = newTitle.trim();
//   const trimmedContent = newContent.trim();

//   if (!trimmedTitle || !trimmedContent) {
//     alert("Title and content cannot be empty.");
//     return;
//   }

//   try {
//     await axios.put(`${API_BASE}/blogs/${id}`, {
//       title: trimmedTitle,
//       content: trimmedContent,
//     });

//     // Update DOM without fetching all
//     const blogEl = document.getElementById(`blog-${id}`);
//     if (blogEl) {
//       const h3 = blogEl.querySelector("h3");
//       const p = blogEl.querySelector("p");
//       if (h3) h3.textContent = trimmedTitle;
//       if (p) p.textContent = trimmedContent;
//     }

//     alert("Blog updated successfully!");
//   } catch (err) {
//     console.error("Error updating blog:", err);
//     alert("Error updating blog!");
//   }
// }

// //  DOMContentLoaded

// document.addEventListener("DOMContentLoaded", () => {
//   const blogForm = document.getElementById("blogForm");
//   if (blogForm) blogForm.addEventListener("submit", handleAddBlog);

//   displayDashboardUser();
//   fetchBlogs();
// });

// const API_BASE = "http://localhost:3000/api";

// // ======= TOGGLE FORMS =======
// function showLogin() {
//   document.getElementById("formTitle").innerText = "Login Form";
//   document.getElementById("loginForm").classList.remove("hidden");
//   document.getElementById("signupForm").classList.add("hidden");
//   document.getElementById("btn").style.left = "0px";
// }

// function showSignup() {
//   document.getElementById("formTitle").innerText = "Signup Form";
//   document.getElementById("signupForm").classList.remove("hidden");
//   document.getElementById("loginForm").classList.add("hidden");
//   document.getElementById("btn").style.left = "110px";
// }

// // ======= SIGNUP =======
// async function handleSignup() {
//   const name = document.getElementById("signupUsername").value.trim();
//   const email = document.getElementById("signupEmail").value.trim();
//   const password = document.getElementById("signupPassword").value.trim();
//   const confirmPassword = document
//     .getElementById("signupConfirmPassword")
//     .value.trim();
//   const message = document.getElementById("signupMessage");

//   message.innerText = "";
//   message.style.color = "red";

//   if (!name || !email || !password || !confirmPassword) {
//     message.innerText = "All fields are required!";
//     return;
//   }
//   if (password !== confirmPassword) {
//     message.innerText = "Passwords do not match!";
//     return;
//   }

//   try {
//     const res = await axios.post(`${API_BASE}/signup`, {
//       name,
//       email,
//       password,
//     });
//     message.style.color = "green";
//     message.innerText = res.data.message || "Signup successful!";
//     setTimeout(showLogin, 1000);
//   } catch (err) {
//     message.innerText = err.response?.data?.message || "Signup failed!";
//   }
// }

// // ======= LOGIN =======
// async function handleLogin() {
//   const email = document.getElementById("loginEmail").value.trim();
//   const password = document.getElementById("loginPassword").value.trim();
//   const message = document.getElementById("loginMessage");

//   message.innerText = "";
//   message.style.color = "red";

//   if (!email || !password) {
//     message.innerText = "Please enter both fields!";
//     return;
//   }

//   try {
//     const res = await axios.post(
//       `${API_BASE}/login`,
//       { email, password },
//       { withCredentials: true }
//     );
//     message.style.color = "green";
//     message.innerText = "Login successful! Redirecting...";
//     setTimeout(() => {
//       window.location.href = "dashboard.html";
//     }, 900);
//   } catch (err) {
//     message.innerText = err.response?.data?.message || "Login failed!";
//   }
// }

// // ======= LOGOUT =======
// async function logout() {
//   try {
//     await axios.post(`${API_BASE}/logout`, {}, { withCredentials: true });
//     window.location.href = "index.html";
//   } catch {
//     alert("Logout failed!");
//   }
// }

// // ======= DISPLAY USER ON DASHBOARD =======
// async function displayDashboardUser() {
//   try {
//     const res = await axios.get(`${API_BASE}/me`, { withCredentials: true });
//     const nameEl = document.getElementById("usernameDisplay");
//     if (nameEl) nameEl.innerText = res.data.user?.name || "User";
//   } catch (err) {
//     console.warn("Not logged in or session expired:", err.response?.data);
//     // 👉 Instead of redirecting every time, just show a message or button
//     const nameEl = document.getElementById("usernameDisplay");
//     if (nameEl) nameEl.innerText = "Guest";
//     // optional: window.location.href = "index.html"; // only if confirmed needed
//   }
// }

// // ======= FETCH ALL BLOGS =======
// async function fetchBlogs() {
//   const blogsContainer = document.getElementById("blogsContainer");
//   const totalBlogs = document.getElementById("totalBlogs");

//   try {
//     const res = await axios.get(`${API_BASE}/blogs`, { withCredentials: true });
//     const blogs = res.data.blogs || [];

//     blogsContainer.innerHTML = "";
//     totalBlogs.innerText = blogs.length;

//     if (blogs.length === 0) {
//       blogsContainer.innerHTML = "<p>No blogs yet. Add your first one!</p>";
//       return;
//     }

//     blogs.forEach((blog) => {
//       const blogDiv = document.createElement("div");
//       blogDiv.classList.add("blog-card");
//       blogDiv.innerHTML = `
//         <h3>${blog.title}</h3>
//         <p>${blog.content}</p>
//         <p class="author-line">By <b>${blog.author}</b></p>
//       `;
//       blogsContainer.appendChild(blogDiv);
//     });
//   } catch (err) {
//     console.error(err);
//     blogsContainer.innerHTML = "<p>Failed to load blogs.</p>";
//   }
// }

// // ======= ADD BLOG =======
// async function handleAddBlog(e) {
//   e.preventDefault();

//   const title = document.getElementById("blogTitle").value.trim();
//   const content = document.getElementById("blogContent").value.trim();
//   const message = document.getElementById("blogMessage");

//   if (!title || !content) {
//     message.style.color = "red";
//     message.innerText = "Please fill out all fields!";
//     return;
//   }

//   try {
//     const res = await axios.post(
//       `${API_BASE}/blogs`,
//       { title, content },
//       { withCredentials: true }
//     );

//     message.style.color = "green";
//     message.innerText = res.data.message || "Blog added successfully!";
//     document.getElementById("blogForm").reset();

//     fetchBlogs(); // refresh list
//   } catch (err) {
//     message.style.color = "red";
//     message.innerText = err.response?.data?.message || "Error adding blog!";
//   }
// }

// // ======= EVENT LISTENERS =======
// // ======= EVENT LISTENERS =======
// document.addEventListener("DOMContentLoaded", () => {
//   // handle blog form
//   const blogForm = document.getElementById("blogForm");
//   if (blogForm) blogForm.addEventListener("submit", handleAddBlog);

//   // handle tab switches (login/signup)
//   const tabLogin = document.getElementById("tabLogin");
//   const tabSignup = document.getElementById("tabSignup");
//   const linkToSignup = document.getElementById("linkToSignup");

//   if (tabLogin) tabLogin.addEventListener("click", showLogin);
//   if (tabSignup) tabSignup.addEventListener("click", showSignup);
//   if (linkToSignup) linkToSignup.addEventListener("click", showSignup);
//   document.addEventListener("DOMContentLoaded", () => {
//   // login/signup toggle buttons
//   const tabLogin = document.getElementById("tabLogin");
//   const tabSignup = document.getElementById("tabSignup");
//   const linkToSignup = document.getElementById("linkToSignup");
//   if (tabLogin) tabLogin.addEventListener("click", showLogin);
//   if (tabSignup) tabSignup.addEventListener("click", showSignup);
//   if (linkToSignup) linkToSignup.addEventListener("click", showSignup);

//   // handle signup form submit
//   const signupForm = document.getElementById("signupForm");
//   if (signupForm) {
//     signupForm.addEventListener("submit", (e) => {
//       e.preventDefault(); // ⛔ stop page reload
//       handleSignup();
//     });
//   }

//   // handle login form submit
//   const loginForm = document.getElementById("loginForm");
//   if (loginForm) {
//     loginForm.addEventListener("submit", (e) => {
//       e.preventDefault(); // ⛔ stop page reload
//       handleLogin();
//     });
//   }
// });

//   // dashboard
//   displayDashboardUser();
//   fetchBlogs();
// });

// public/script.js
const API_BASE = "http://localhost:3000/api";

/* -----------------------
   UI: toggle login/signup
   ----------------------- */
function showLogin() {
  document.getElementById("formTitle").innerText = "Login Form";
  document.getElementById("loginForm").classList.remove("hidden");
  document.getElementById("signupForm").classList.add("hidden");
  const btn = document.getElementById("btn");
  if (btn) btn.style.left = "0px";
}

function showSignup() {
  document.getElementById("formTitle").innerText = "Signup Form";
  document.getElementById("signupForm").classList.remove("hidden");
  document.getElementById("loginForm").classList.add("hidden");
  const btn = document.getElementById("btn");
  if (btn) btn.style.left = "110px";
}

/* ===========
   Signup
   =========== */
async function handleSignup() {
  const name = document.getElementById("signupUsername").value.trim();
  const email = document.getElementById("signupEmail").value.trim();
  const password = document.getElementById("signupPassword").value.trim();
  const role = document.getElementById("signupRole").value;
  const confirmPassword = document
    .getElementById("signupConfirmPassword")
    .value.trim();
  const message = document.getElementById("signupMessage");

  message.innerText = "";
  message.style.color = "red";

  if (!name || !email || !password || !confirmPassword) {
    message.innerText = "All fields are required!";
    return;
  }
  if (password !== confirmPassword) {
    message.innerText = "Passwords do not match!";
    return;
  }

  try {
    const res = await axios.post(`${API_BASE}/signup`, {
      name,
      email,
      password,
      role,
       
    });
    message.style.color = "green";
    message.innerText = res.data.message || "Signup successful!";
    // optional: clear form
    document.getElementById("signupForm").reset();
    setTimeout(showLogin, 900);
  } catch (err) {
    console.error("Signup error:", err.response || err);
    message.innerText = err.response?.data?.message || "Signup failed!";
  }
}

/* ===========
   Login
   ===========
   This version stores the returned user object in localStorage so
   dashboard can use it. If you want session/cookie-only approach,
   let me know and I'll change backend accordingly.
*/
async function handleLogin() {
  const email = document.getElementById("loginEmail").value.trim();
  const password = document.getElementById("loginPassword").value.trim();
  const message = document.getElementById("loginMessage");

  message.innerText = "";
  message.style.color = "red";

  if (!email || !password) {
    message.innerText = "Please enter both fields!";
    return;
  }

  try {
    const res = await axios.post(`${API_BASE}/login`, { email, password }, { withCredentials: true });
    const user = res.data.user;

    if (user) {
      // Save user data in localStorage
      localStorage.setItem("loggedInUser", JSON.stringify(user));

      // Success message
      message.style.color = "green";
      message.innerText = "Login successful! Redirecting...";

      // Role-based redirect
      setTimeout(() => {
        if (user.role === "admin") {
          window.location.href = "admin-dashboard.html";
        } else {
          window.location.href = "dashboard.html";
        }
      }, 700);

    } else {
      message.innerText = res.data.message || "Login failed!";
    }

  } catch (err) {
    console.error("Login error:", err.response || err);
    message.innerText = err.response?.data?.message || "Login failed!";
  }
}


/* ===========
   Logout
   =========== */
function logout() {
  localStorage.removeItem("loggedInUser");
  window.location.href = "index.html";
}

/* =======================
   Dashboard helpers
   ======================= */
function displayDashboardUser() {
  const raw = localStorage.getItem("loggedInUser");
  const nameEl = document.getElementById("usernameDisplay");
  if (!raw) {
    if (nameEl) nameEl.innerText = "Guest";
    return;
  }
  try {
    const user = JSON.parse(raw);
    if (nameEl) nameEl.innerText = user.name || "User";
  } catch {
    if (nameEl) nameEl.innerText = "User";
  }
}

/* =======================
   Fetch all blogs (public)
   GET /api/blogs
   ======================= */
async function fetchBlogs() {
  const blogsContainer = document.getElementById("blogsContainer");
  const totalBlogs = document.getElementById("totalBlogs");
  if (!blogsContainer) return;

  blogsContainer.innerHTML = "Loading...";
  try {
    const res = await axios.get(`${API_BASE}/blogs`);
    const blogs = res.data.blogs || [];
    blogsContainer.innerHTML = "";
    if (totalBlogs) totalBlogs.innerText = blogs.length;

    if (!blogs.length) {
      blogsContainer.innerHTML = "<p>No blogs yet. Add the first one!</p>";
      return;
    }

    blogs.forEach((b) => {
      const card = document.createElement("div");
      card.className = "blog-card";
      const date = b.createdAt ? new Date(b.createdAt).toLocaleString() : "";
      // Use schema fields blogTitle, blogDescription, authorName (fallback to other names)
      const title = b.blogTitle || b.title || "Untitled";
      const author = b.authorName || b.author || "Unknown";
      const body = b.blogDescription || b.content || "";

      card.innerHTML = `
        <h3>${escapeHtml(title)}</h3>
        <p class="meta">By <b>${escapeHtml(author)}</b> • ${escapeHtml(date)}</p>
        <p>${escapeHtml(body.slice(0, 300))}${body.length > 300 ? "..." : ""}</p>
      `;
      blogsContainer.appendChild(card);
    });
  } catch (err) {
    console.error("fetchBlogs error:", err.response || err);
    blogsContainer.innerHTML = "<p>Failed to load blogs.</p>";
    if (totalBlogs) totalBlogs.innerText = "0";
  }
}

/* =======================
   Add blog
   POST /api/blogs
   ======================= */
async function handleAddBlog(e) {
  e.preventDefault();

  const titleEl = document.getElementById("blogTitle");
  const contentEl = document.getElementById("blogContent");
  const message = document.getElementById("blogMessage");
  if (!titleEl || !contentEl) return;

  const blogTitle = titleEl.value.trim();
  const blogDescription = contentEl.value.trim();

  if (!blogTitle || !blogDescription) {
    if (message) {
      message.style.color = "red";
      message.innerText = "Please fill out all fields!";
    }
    return;
  }

  const raw = localStorage.getItem("loggedInUser");
  if (!raw) {
    alert("Please login first!");
    return;
  }
  let loggedUser;
  try {
    loggedUser = JSON.parse(raw);
  } catch {
    alert("Login info invalid. Please login again.");
    return;
  }

  // IMPORTANT: field names match your Mongoose schema
  const payload = {
    blogTitle,
    blogDescription,
    authorName: loggedUser.name || "Unknown",
    userId: loggedUser._id || loggedUser.id || null
  };

  console.log("Sending payload:", payload); // debug

  try {
    const res = await axios.post(`${API_BASE}/blogs`, payload);
    console.log("Add blog response:", res.data);
    message.style.color = "green";
    message.innerText = res.data.message || "Blog added successfully!";
    document.getElementById("blogForm").reset();
    fetchBlogs();
  } catch (err) {
    console.error("Add blog error:", err.response?.data || err.message || err);
    if (message) {
      message.style.color = "red";
      message.innerText = err.response?.data?.message || "Error adding blog!";
    } else {
      alert("Error adding blog!");
    }
  }}
/* ===== utilities ===== */
function escapeHtml(str = "") {
  return String(str).replace(
    /[&<>"']/g,
    (s) =>
      ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[
        s
      ])
  );
}

/* =======================
   Wire up events on load
   ======================= */
document.addEventListener("DOMContentLoaded", () => {
  // Toggle buttons on index.html
  const tabLogin = document.getElementById("tabLogin");
  const tabSignup = document.getElementById("tabSignup");
  const linkToSignup = document.getElementById("linkToSignup");
  if (tabLogin) tabLogin.addEventListener("click", showLogin);
  if (tabSignup) tabSignup.addEventListener("click", showSignup);
  if (linkToSignup) linkToSignup.addEventListener("click", showSignup);

  // Signup form submit
  const signupForm = document.getElementById("signupForm");
  if (signupForm) {
    signupForm.addEventListener("submit", (e) => {
      e.preventDefault();
      handleSignup();
    });
  }

  // Login form submit
  const loginForm = document.getElementById("loginForm");
  if (loginForm) {
    loginForm.addEventListener("submit", (e) => {
      e.preventDefault();
      handleLogin();
    });
  }

  // Dashboard: add blog form
  const blogForm = document.getElementById("blogForm");
  if (blogForm) blogForm.addEventListener("submit", handleAddBlog);

  // Dashboard display + blogs
  displayDashboardUser();
  
});
