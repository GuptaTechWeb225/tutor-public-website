const users = [
    {
        id: 1,
        name: "Emma Wilson",
        avatar: "https://i.pravatar.cc/150?img=15",
        unread: 1,
        messages: [
            { type: "incoming", from: "Student", text: "Aarav, have you reviewed the pending JavaScript queries from students?", time: "09:50" },
            { type: "outgoing", from: "student", text: "Yes, I have resolved 12 out of 15 queries. The remaining 3 need additional details from the students.", time: "09:55" },
            { type: "incoming", from: "student", text: "Good work. Please update the resolution notes in the admin dashboard by EOD.", time: "10:00" },
            { type: "outgoing", from: "student", text: "Sure, I will complete the documentation and upload it by 5 PM today.", time: "10:05" },
            { type: "incoming", from: "student", text: "Perfect. Keep tracking unresolved queries daily.", time: "10:10" }
        ]
    },
    {
        id: 2,
        name: "Sophia Lee",
        role: "Expert (Canada)",
        avatar: "https://i.pravatar.cc/150?img=16",
        unread: 0,
        messages: [
            { type: "incoming", from: "Super Admin", text: "Sophia, did you prepare the weekly report for AI/ML doubts?", time: "11:15" },
            { type: "outgoing", from: "Expert", text: "Yes, I compiled the report with resolved queries and response times. Average resolution time dropped by 12%.", time: "11:20" },
            { type: "incoming", from: "Super Admin", text: "That’s great. Please share the report with the team leads.", time: "11:25" },
            { type: "outgoing", from: "Expert", text: "I’ve already sent it via email and uploaded to the shared drive.", time: "11:30" },
            { type: "incoming", from: "Super Admin", text: "Excellent work, keep the consistency.", time: "11:35" }
        ]
    },
    {
        id: 3,
        name: "Michael Johnson",
        role: "Expert (USA)",
        avatar: "https://i.pravatar.cc/150?img=17",
        unread: 2,
        messages: [
            { type: "incoming", from: "Super Admin", text: "Michael, we received feedback about delayed responses yesterday. What happened?", time: "14:10" },
            { type: "outgoing", from: "Expert", text: "Yes, the server downtime caused delays in answering queries. I coordinated with the tech team and it’s fixed now.", time: "14:15" },
            { type: "incoming", from: "Super Admin", text: "Understood. Please ensure the backup system is activated for such cases.", time: "14:18" },
            { type: "outgoing", from: "Expert", text: "Yes, I’ve updated the workflow and notified the team for fallback procedures.", time: "14:20" },
            { type: "incoming", from: "Super Admin", text: "Great. Make sure no similar issues happen this week.", time: "14:25" }
        ]
    },
    {
        id: 4,
        name: "Emma Wilson",
        role: "Expert (UK)",
        avatar: "https://i.pravatar.cc/150?img=18",
        unread: 0,
        messages: [
            { type: "incoming", from: "Super Admin", text: "Emma, the law-related queries are piling up. Can you prioritize them?", time: "16:00" },
            { type: "outgoing", from: "Expert", text: "Yes, I’ve already started handling legal queries first. I resolved 8 today.", time: "16:05" },
            { type: "incoming", from: "Super Admin", text: "Good. Please provide a summary report by Friday.", time: "16:10" },
            { type: "outgoing", from: "Expert", text: "Noted. I’ll prepare and share it in the weekly review meeting.", time: "16:15" },
            { type: "incoming", from: "Super Admin", text: "Perfect, thank you for the quick action.", time: "16:20" }
        ]
    },
    {
        id: 5,
        name: "Carlos Ramirez",
        role: "Expert (Mexico)",
        avatar: "https://i.pravatar.cc/150?img=19",
        unread: 1,
        messages: [
            { type: "incoming", from: "Super Admin", text: "Carlos, have you updated the FAQs section with new answers?", time: "18:45" },
            { type: "outgoing", from: "Expert", text: "I’ve updated most categories. Only the medical section is pending.", time: "18:50" },
            { type: "incoming", from: "Super Admin", text: "Please finish that today and inform me once completed.", time: "18:55" },
            { type: "outgoing", from: "Expert", text: "Sure, I’ll finalize and update by tonight.", time: "19:00" },
            { type: "incoming", from: "Super Admin", text: "Good. I’ll check tomorrow morning.", time: "19:05" }
        ]
    },

];


let currentChatId = null;

function renderChatList() {
    const chatList = document.getElementById("chatListItems");
    chatList.innerHTML = users.map(user => {
        const lastMsg = user.messages[user.messages.length - 1] || {};
        return `
        <div class="d-flex align-items-center p-3  chat-item" onclick="openChat(${user.id})" style="cursor:pointer;">
          <img src="${user.avatar}" class="rounded-circle me-2" width="45">
          <div class="flex-grow-1">
            <div class="d-flex justify-content-between">
              <span class="fw-bold">${user.name}</span>
              <small class="text-muted">${lastMsg.time || ''}</small>
            </div>
          <div class="d-flex justify-content-between align-items-center">
  <small class="text-truncate text-muted" style="max-width: 70%;">
    ${lastMsg.text ? lastMsg.text.slice(0, 30) + '...' : ''}
  </small>
  ${user.unread > 0 ? `<span class="badge bg-secondary">${user.unread}</span>` : ""}
</div>

          </div>
        </div>`;
    }).join('');
}

function openChat(id) {
    currentChatId = id;
    const user = users.find(u => u.id === id);
    user.unread = 0;

    document.getElementById("chatPlaceholder").classList.add("d-none");
    document.getElementById("chatWindow").classList.remove("d-none");

    document.getElementById("chatUserName").innerText = user.name;
    document.getElementById("chatAvatar").src = user.avatar;

    const chatBody = document.getElementById("chatBody");
    chatBody.innerHTML = user.messages.map(msg => `
      <div class="message ${msg.type}">
        ${msg.text || ''}
        <small class="d-block text-muted text-end" style="font-size:10px;">${msg.time || ''}</small>
      </div>`).join('');

    if (window.innerWidth <= 992) {
        document.getElementById("chatApp").classList.add("mobile-chat");
    }

    setTimeout(() => {
        chatBody.scrollTop = chatBody.scrollHeight;
    }, 0);

    renderChatList();
}

function backToList() {
    if (window.innerWidth <= 992) {
        document.getElementById("chatApp").classList.remove("mobile-chat");
    }
}

renderChatList();

function filterChats(searchTerm) {
    const term = searchTerm.toLowerCase();

    const filteredUsers = users.filter(user =>
        user.name.toLowerCase().includes(term)
    );

    const chatList = document.getElementById("chatListItems");
    chatList.innerHTML = filteredUsers.map(user => {
        const lastMsg = user.messages[user.messages.length - 1] || {};
        return `
      <div class="d-flex align-items-center p-3 chat-item" onclick="openChat(${user.id})" style="cursor:pointer;">
        <img src="${user.avatar}" class="rounded-circle me-2" width="45">
        <div class="flex-grow-1">
          <div class="d-flex justify-content-between">
            <span class="fw-bold">${user.name}</span>
            <small class="text-muted">${lastMsg.time || ''}</small>
          </div>
          <div class="d-flex justify-content-between align-items-center">
            <small class="text-truncate text-muted" style="max-width: 70%;">
              ${lastMsg.text ? lastMsg.text.slice(0, 30) + '...' : ''}
            </small>
            ${user.unread > 0 ? `<span class="badge bg-danger">${user.unread}</span>` : ""}
          </div>
        </div>
      </div>`;
    }).join('');
}

document.getElementById('chatSearchModal').addEventListener('shown.bs.modal', () => {
    renderPopupChatList(users);
});

function sendMessage() {
    const input = document.getElementById("chatInput");
    const text = input.value.trim();
    if (!text || currentChatId === null) return;

    const user = users.find(u => u.id === currentChatId);
    user.messages.push({
        type: "outgoing",
        text,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    });

    input.value = "";
    openChat(currentChatId); l
}

function renderPopupChatList(usersToRender = users) {
    const popupList = document.getElementById("popupChatList");
    popupList.innerHTML = usersToRender.map(user => {
        const lastMsg = user.messages[user.messages.length - 1] || {};
        return `
      <div class="d-flex align-items-center p-2 chat-item" 
           style="cursor:pointer;" 
           onclick="selectUserFromPopup(${user.id})">
        <img src="${user.avatar}" class="rounded-circle me-2" width="40">
        <div class="flex-grow-1">
          <div class="d-flex justify-content-between">
            <span class="fw-bold">${user.name}</span>
            <small class="text-muted">${lastMsg.time || ''}</small>
          </div>
          <small class="text-truncate text-muted" style="max-width: 80%;">
            ${lastMsg.text ? lastMsg.text.slice(0, 30) + '...' : ''}
          </small>
        </div>
      </div>
    `;
    }).join('');
}


