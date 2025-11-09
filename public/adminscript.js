const token = localStorage.getItem("token");
const apiUrl = "http://localhost:5000";

function logout() {
  localStorage.removeItem("token");
  localStorage.removeItem("role");
  window.location.href = "index.html";
}

async function fetchAllUsers() {
  try {
    const res = await axios.get(`${apiUrl}/admin/users`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    const users = res.data.users;
    const container = document.getElementById("usersContainer");
    container.innerHTML = users
      .map(
        (u) => `
        <div class="data-item">
          <h3>${u.fullName}</h3>
          <p>Email: ${u.email}</p>
          <p>Role: ${u.role}</p>
          <div class="admin-actions">
            <button class="promote" onclick="promoteUser('${u._id}')">Promote</button>
            <button class="demote" onclick="demoteUser('${u._id}')">Demote</button>
            <button class="delete" onclick="deleteUser('${u._id}')">Delete</button>
          </div>
        </div>`
      )
      .join("");
    document.getElementById("totalUsers").textContent = users.length;
  } catch (err) {
    console.error(err);
  }
}

// async function fetchAllBlogs() {
//   try {
//     const res = await axios.get(`${apiUrl}/admin/blogs`, {
//       headers: { Authorization: `Bearer ${token}` },
//     });
//     const blogs = res.data.blogs;
//     const container = document.getElementById("adminBlogsContainer");
//     container.innerHTML = blogs
//       .map(
//         (b) => `
//         <div class="data-item">
//           <h3>${b.title}</h3>
//           <p>${b.content}</p>
//           <p><b>Author:</b> ${b.authorName}</p>
//           <div class="admin-actions">
//             <button class="delete" onclick="deleteBlog('${b._id}')">Delete Blog</button>
//           </div>
//         </div>`
//       )
//       .join("");
//     document.getElementById("totalBlogs").textContent = blogs.length;
//   } catch (err) {
//     console.error(err);
//   }
// }


// async function fetchBlogs() {
//   const blogsContainer = document.getElementById("blogsContainer");
//   const totalBlogs = document.getElementById("totalBlogs");
//   if (!blogsContainer) return;

//   blogsContainer.innerHTML = "Loading...";
//   try {
//     const res = await axios.get(`${API_BASE}/blogs`);
//     const blogs = res.data.blogs || [];
//     blogsContainer.innerHTML = "";
//     if (totalBlogs) totalBlogs.innerText = blogs.length;

//     if (!blogs.length) {
//       blogsContainer.innerHTML = "<p>No blogs yet. Add the first one!</p>";
//       return;
//     }

//     blogs.forEach((b) => {
//       const card = document.createElement("div");
//       card.className = "blog-card";
//       const date = b.createdAt ? new Date(b.createdAt).toLocaleString() : "";
//       // Use schema fields blogTitle, blogDescription, authorName (fallback to other names)
//       const title = b.blogTitle || b.title || "Untitled";
//       const author = b.authorName || b.author || "Unknown";
//       const body = b.blogDescription || b.content || "";

//       card.innerHTML = `
//         <h3>${escapeHtml(title)}</h3>
//         <p class="meta">By <b>${escapeHtml(author)}</b> • ${escapeHtml(date)}</p>
//         <p>${escapeHtml(body.slice(0, 300))}${body.length > 300 ? "..." : ""}</p>
//       `;
//       blogsContainer.appendChild(card);
//     });
//   } catch (err) {
//     console.error("fetchBlogs error:", err.response || err);
//     blogsContainer.innerHTML = "<p>Failed to load blogs.</p>";
//     if (totalBlogs) totalBlogs.innerText = "0";
//   }
// }


async function fetchAllBlogs() {
  const container = document.getElementById("adminBlogsContainer");
  const totalBlogs = document.getElementById("totalBlogs");
  if (!container) return;

  container.innerHTML = "Loading...";
  try {
    // Get token from localStorage (or wherever you store JWT)
    const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser")) || {};
    const token = loggedInUser.token || ""; // make sure token exists

    const res = await axios.get(`${API_BASE}/admin/blogs`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    const blogs = res.data.blogs || [];
    container.innerHTML = "";
    if (totalBlogs) totalBlogs.innerText = blogs.length;

    if (!blogs.length) {
      container.innerHTML = "<p>No blogs yet.</p>";
      return;
    }

    blogs.forEach((b) => {
      const card = document.createElement("div");
      card.className = "data-item";

      const title = b.blogTitle || b.title || "Untitled";
      const author = b.authorName || b.author || "Unknown";
      const body = b.blogDescription || b.content || "";
      const date = b.createdAt ? new Date(b.createdAt).toLocaleString() : "";

      card.innerHTML = `
        <h3>${escapeHtml(title)}</h3>
        <p class="meta">By <b>${escapeHtml(author)}</b> • ${escapeHtml(date)}</p>
        <p>${escapeHtml(body.slice(0, 300))}${body.length > 300 ? "..." : ""}</p>
        <div class="admin-actions">
          <button class="delete" onclick="deleteBlog('${b._id}')">Delete Blog</button>
        </div>
      `;

      container.appendChild(card);
    });
  } catch (err) {
    console.error("fetchAllBlogs error:", err.response || err);
    container.innerHTML = "<p>Failed to load blogs.</p>";
    if (totalBlogs) totalBlogs.innerText = "0";
  }
}

