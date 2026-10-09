(function () {
  "use strict";

  const STORAGE_KEY = "handstand-rpg-v1";
  const INSTALL_TIP_KEY = "handstand-pwa-install-tip-dismissed";
  const XP_PER_LEVEL = 50;
  const STREAK_GAP_DAYS = 5;
  const STREAK_BONUS_EVERY = 3;
  const STREAK_BONUS_XP = 15;

  const STAGES = [
    {
      id: "prep",
      name: "Wrist & shoulder prep",
      unlockGoal: "Solid plank 30s without wrist pain",
      tips: "Warm wrists before every session. Pain = stop and rest.",
      drills: [
        { id: "wrist-circles", label: "Wrist circles & rocks", meta: "2 min · gentle" },
        { id: "shoulder-opener", label: "Shoulder openers (puppy / thread-the-needle)", meta: "2 min" },
        { id: "plank-holds", label: "Plank holds (knees OK)", meta: "3 × 20–30s" },
        { id: "scap-pushups", label: "Scapular push-ups", meta: "2 × 8–10" },
        { id: "hollow-hold", label: "Hollow body hold", meta: "3 × 15–20s" },
      ],
    },
    {
      id: "pike",
      name: "Pike / elevated pike",
      unlockGoal: "Lean ~10s with most weight on hands",
      tips: "Stack shoulders over wrists. Look at the floor between hands.",
      drills: [
        { id: "wrist-warm", label: "Wrist warm-up", meta: "90 sec" },
        { id: "pike-hold", label: "Pike hold (hips high)", meta: "3 × 20–30s" },
        { id: "elevated-pike", label: "Elevated pike lean (feet on box/couch)", meta: "4 × 8–12s" },
        { id: "shoulder-taps", label: "Pike shoulder taps", meta: "2 × 6/side" },
        { id: "wall-facing-lean", label: "Wall-facing lean (hands far from wall)", meta: "3 × 10s" },
      ],
    },
    {
      id: "wall-walk",
      name: "Wall walk-up",
      unlockGoal: "Stay 10–15s with control",
      tips: "Walk feet up slowly. Keep ribs in; don't dump into the lower back.",
      drills: [
        { id: "wrist-warm2", label: "Wrist + shoulder warm-up", meta: "2 min" },
        { id: "elevated-pike2", label: "Elevated pike refresher", meta: "2 × 15s" },
        { id: "wall-walks", label: "Wall walk-ups", meta: "5–8 reps · stay 5–10s at top" },
        { id: "chest-partial", label: "Chest toward wall (partial)", meta: "3 × 8–12s" },
        { id: "scap-holds", label: "Scapular holds upside-down", meta: "3 × 5s at top of walk" },
      ],
    },
    {
      id: "chest-wall",
      name: "Chest-to-wall hold",
      unlockGoal: "Clean 20s hold",
      tips: "Nose close to wall, hips stacked. Breathe calmly.",
      drills: [
        { id: "warm3", label: "Full warm-up circuit", meta: "3 min" },
        { id: "wall-walk-entry", label: "Wall walk into chest-to-wall", meta: "warm-up set" },
        { id: "ctw-holds", label: "Chest-to-wall holds", meta: "5 × 10–20s" },
        { id: "heel-pulls", label: "Heel pulls off wall (tiny)", meta: "4 × 3–5s" },
        { id: "shoulder-endurance", label: "Shoulder endurance set", meta: "1 × max comfortable" },
      ],
    },
    {
      id: "kick-up",
      name: "Kick-up practice",
      unlockGoal: "Kick into wall hold 5 times with control",
      tips: "Soft kick, not a flop. Spot the landing. Use wall as a safety net.",
      drills: [
        { id: "warm4", label: "Warm-up + 1 chest-to-wall", meta: "3–4 min" },
        { id: "lunge-entries", label: "Lunge entries to wall", meta: "8–12 attempts" },
        { id: "controlled-kicks", label: "Controlled kick-ups (catch & hold)", meta: "goal: 5 clean" },
        { id: "bail-practice", label: "Safe bail / cartwheel out practice", meta: "3–5 reps" },
        { id: "hold-after", label: "Hold after successful kick", meta: "as long as comfortable" },
      ],
    },
    {
      id: "freestanding",
      name: "Freestanding attempts",
      unlockGoal: "Short holds away from wall — keep exploring!",
      tips: "Short attempts beat long fails. Film yourself. Celebrate 1–2 second balances.",
      drills: [
        { id: "warm5", label: "Full prep + chest-to-wall", meta: "4 min" },
        { id: "kick-away", label: "Kick-ups slightly off wall", meta: "10–15 attempts" },
        { id: "toe-pull", label: "Toe-pull balances (back to wall)", meta: "6–8" },
        { id: "free-holds", label: "Freestanding attempts", meta: "quality over quantity" },
        { id: "cool-down", label: "Wrist cool-down stretches", meta: "2 min" },
      ],
    },
  ];

  const DEFAULT_STATE = {
    name: "Long",
    xp: 0,
    streak: 0,
    unlockedStage: 0, // index of current stage (highest unlocked)
    completedStages: [], // indices fully unlocked past
    sessions: [],
    lastSessionDate: null,
    bossLogs: [],
  };

  // ——— State ———
  function loadState() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return structuredClone(DEFAULT_STATE);
      const parsed = JSON.parse(raw);
      return { ...structuredClone(DEFAULT_STATE), ...parsed };
    } catch {
      return structuredClone(DEFAULT_STATE);
    }
  }

  function saveState(state) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  }

  let state = loadState();

  // ——— Helpers ———
  function levelFromXp(xp) {
    return Math.floor(xp / XP_PER_LEVEL) + 1;
  }

  function xpIntoLevel(xp) {
    return xp % XP_PER_LEVEL;
  }

  function daysBetween(isoA, isoB) {
    const a = new Date(isoA);
    const b = new Date(isoB);
    a.setHours(0, 0, 0, 0);
    b.setHours(0, 0, 0, 0);
    return Math.round((b - a) / 86400000);
  }

  function todayISO() {
    const d = new Date();
    const y = d.getFullYear();
    const m = String(d.getMonth() + 1).padStart(2, "0");
    const day = String(d.getDate()).padStart(2, "0");
    return `${y}-${m}-${day}`;
  }

  function formatDate(iso) {
    if (!iso) return "—";
    const d = new Date(iso + "T12:00:00");
    return d.toLocaleDateString(undefined, {
      weekday: "short",
      month: "short",
      day: "numeric",
    });
  }

  function currentStageIndex() {
    return Math.min(state.unlockedStage, STAGES.length - 1);
  }

  function nextStageIndex() {
    return state.unlockedStage < STAGES.length - 1 ? state.unlockedStage + 1 : null;
  }

  // ——— XP / streak ———
  function applyStreak(sessionDate) {
    let bonus = 0;
    let messages = [];
    let incremented = false;
    if (!state.lastSessionDate) {
      state.streak = 1;
      incremented = true;
    } else {
      const gap = daysBetween(state.lastSessionDate, sessionDate);
      if (gap === 0) {
        // same day — don't change streak, still allow logging
      } else if (gap > 0 && gap <= STREAK_GAP_DAYS) {
        state.streak += 1;
        incremented = true;
      } else if (gap > STREAK_GAP_DAYS) {
        state.streak = 1;
        incremented = true;
        messages.push("Streak reset (gap > 5 days)");
      }
    }
    if (incremented && state.streak > 0 && state.streak % STREAK_BONUS_EVERY === 0) {
      bonus = STREAK_BONUS_XP;
      messages.push(`Streak ×${state.streak}! +${STREAK_BONUS_XP} XP`);
    }
    state.lastSessionDate = sessionDate;
    return { bonus, messages };
  }

  function addXp(amount) {
    const before = levelFromXp(state.xp);
    state.xp += amount;
    const after = levelFromXp(state.xp);
    return after > before;
  }

  // ——— Confetti ———
  function fireConfetti() {
    const canvas = document.getElementById("confetti");
    const ctx = canvas.getContext("2d");
    const dpr = window.devicePixelRatio || 1;
    canvas.width = window.innerWidth * dpr;
    canvas.height = window.innerHeight * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    const colors = ["#5ef0c0", "#f5b942", "#7eb8ff", "#ff6b7a", "#c4a0ff"];
    const pieces = Array.from({ length: 80 }, () => ({
      x: Math.random() * window.innerWidth,
      y: -20 - Math.random() * 60,
      w: 6 + Math.random() * 6,
      h: 8 + Math.random() * 8,
      vy: 2 + Math.random() * 4,
      vx: -2 + Math.random() * 4,
      rot: Math.random() * Math.PI,
      vr: -0.2 + Math.random() * 0.4,
      color: colors[Math.floor(Math.random() * colors.length)],
    }));

    let frame = 0;
    const maxFrames = 90;

    function tick() {
      ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
      pieces.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;
        p.vy += 0.08;
        p.rot += p.vr;
        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.rot);
        ctx.fillStyle = p.color;
        ctx.fillRect(-p.w / 2, -p.h / 2, p.w, p.h);
        ctx.restore();
      });
      frame++;
      if (frame < maxFrames) {
        requestAnimationFrame(tick);
      } else {
        ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
      }
    }
    requestAnimationFrame(tick);
  }

  // ——— Toast ———
  let toastTimer;
  function toast(msg) {
    const el = document.getElementById("toast");
    el.textContent = msg;
    el.hidden = false;
    requestAnimationFrame(() => el.classList.add("show"));
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => {
      el.classList.remove("show");
      setTimeout(() => { el.hidden = true; }, 250);
    }, 2800);
  }

  // ——— Render ———
  function renderAll() {
    renderHome();
    renderQuest();
    renderLogForm();
    renderMap();
    renderHistory();
    renderSettings();
  }

  function renderHome() {
    const lvl = levelFromXp(state.xp);
    const into = xpIntoLevel(state.xp);
    document.getElementById("display-name").textContent = state.name;
    document.getElementById("level-num").textContent = String(lvl);
    document.getElementById("xp-label").textContent = `${into} / ${XP_PER_LEVEL} XP`;
    document.getElementById("streak-badge").textContent = `🔥 ${state.streak}`;
    const fill = document.getElementById("xp-fill");
    fill.style.width = `${(into / XP_PER_LEVEL) * 100}%`;
    const bar = document.getElementById("xp-bar-wrap");
    bar.setAttribute("aria-valuenow", String(into));
    bar.setAttribute("aria-valuemax", String(XP_PER_LEVEL));

    const stage = STAGES[currentStageIndex()];
    document.getElementById("current-stage-name").textContent = stage.name;
    document.getElementById("home-tip").textContent = stage.tips;

    const summary = document.getElementById("last-session-summary");
    if (!state.sessions.length) {
      summary.textContent = "No sessions yet — start your first quest!";
      summary.classList.add("muted");
    } else {
      const last = state.sessions[0];
      summary.classList.remove("muted");
      const parts = [
        formatDate(last.date),
        last.type === "rest" ? "Mobility rest day" : `Stage: ${last.stageName || "—"}`,
        `+${last.xpEarned} XP`,
      ];
      if (last.wristFeel) parts.push(`Wrist ${last.wristFeel}/5`);
      if (last.holdTime) parts.push(`Hold ${last.holdTime}s`);
      if (last.kickCount) parts.push(`${last.kickCount} kicks`);
      summary.textContent = parts.join(" · ");
    }
  }

  function renderQuest() {
    const idx = currentStageIndex();
    const stage = STAGES[idx];
    document.getElementById("quest-stage-label").textContent =
      `Stage ${idx + 1} of ${STAGES.length} · ~12–15 min`;

    const list = document.getElementById("quest-drills");
    list.innerHTML = stage.drills
      .map(
        (d) =>
          `<li><strong>${d.label}</strong><span class="drill-meta">${d.meta}</span></li>`
      )
      .join("");

    const unlockCard = document.getElementById("unlock-card");
    const next = nextStageIndex();
    unlockCard.hidden = false;
    if (next === null) {
      const done = state.completedStages.includes(idx);
      document.getElementById("unlock-criteria").textContent = done
        ? `You've completed every stage. Keep logging freestanding practice!`
        : `Final goal: ${stage.unlockGoal}. Self-report when ready (+5 XP attempt, +20 if you mark complete).`;
      document.getElementById("btn-unlock-attempt").disabled = done;
      document.getElementById("btn-unlock-attempt").textContent = done
        ? "All stages complete"
        : "I hit the goal — mark complete";
    } else {
      const nextStage = STAGES[next];
      document.getElementById("unlock-criteria").textContent =
        `To unlock “${nextStage.name}”: ${stage.unlockGoal}. Self-report when ready (+5 XP attempt, +20 if you unlock).`;
      document.getElementById("btn-unlock-attempt").disabled = false;
      document.getElementById("btn-unlock-attempt").textContent = "I hit the goal — unlock attempt";
    }
  }

  function renderLogForm() {
    const stage = STAGES[currentStageIndex()];
    const box = document.getElementById("drill-checkboxes");
    box.innerHTML = stage.drills
      .map(
        (d) =>
          `<label class="check-item"><input type="checkbox" name="drill" value="${d.id}" /><span>${d.label}</span></label>`
      )
      .join("");
  }

  function renderMap() {
    const ul = document.getElementById("stage-map");
    const cur = currentStageIndex();
    ul.innerHTML = STAGES.map((s, i) => {
      let status = "locked";
      let icon = "🔒";
      let statusText = "Locked";
      if (state.completedStages.includes(i) || i < cur) {
        status = "done";
        icon = "✓";
        statusText = "Done";
      }
      if (i === cur && cur < STAGES.length) {
        // If last stage and completed, still show as current/done
        if (state.completedStages.includes(i)) {
          status = "done";
          icon = "✓";
          statusText = "Mastered";
        } else {
          status = "current";
          icon = String(i + 1);
          statusText = "Current";
        }
      }
      if (i > cur) {
        status = "locked";
        icon = "🔒";
        statusText = "Locked";
      }
      return `<li class="stage-item ${status}">
        <div class="stage-icon" aria-hidden="true">${icon}</div>
        <div class="stage-body">
          <h3>${i + 1}. ${s.name}</h3>
          <p>Unlock next: ${s.unlockGoal}</p>
          <span class="stage-status">${statusText}</span>
        </div>
      </li>`;
    }).join("");
  }

  function renderHistory() {
    const ul = document.getElementById("history-list");
    if (!state.sessions.length) {
      ul.innerHTML = `<li class="muted">No sessions yet.</li>`;
      return;
    }
    ul.innerHTML = state.sessions
      .map((s) => {
        const typeLabel =
          s.type === "rest"
            ? "Mobility rest"
            : s.type === "boss"
              ? "Boss fight"
              : s.type === "unlock"
                ? "Unlock attempt"
                : "Training";
        const meta = [];
        if (s.stageName) meta.push(s.stageName);
        if (s.drills && s.drills.length) meta.push(`${s.drills.length} drills`);
        if (s.wristFeel) meta.push(`Wrist ${s.wristFeel}/5`);
        if (s.holdTime != null && s.holdTime !== "") meta.push(`${s.holdTime}s hold`);
        if (s.kickCount != null && s.kickCount !== "") meta.push(`${s.kickCount} kicks`);
        if (s.notes) meta.push(s.notes.slice(0, 60) + (s.notes.length > 60 ? "…" : ""));
        return `<li class="history-item">
          <div class="h-top">
            <span class="h-date">${formatDate(s.date)} · ${typeLabel}</span>
            <span class="h-xp">+${s.xpEarned} XP</span>
          </div>
          <div class="h-meta">${meta.join(" · ") || "—"}</div>
        </li>`;
      })
      .join("");
  }

  function renderSettings() {
    document.getElementById("settings-name").value = state.name;
  }

  function celebrateLevelUp() {
    const chip = document.getElementById("level-chip");
    chip.classList.remove("pulse");
    void chip.offsetWidth;
    chip.classList.add("pulse");
    fireConfetti();
    toast(`Level up! You're Level ${levelFromXp(state.xp)}`);
  }

  // ——— Actions ———
  function pushSession(entry) {
    state.sessions.unshift(entry);
    // keep history reasonable
    if (state.sessions.length > 200) state.sessions.length = 200;
  }

  function logTrainingSession(data) {
    const date = todayISO();
    const prevLevel = levelFromXp(state.xp);
    let xp = 10;
    const msgs = ["Session logged! +10 XP"];

    const { bonus, messages } = applyStreak(date);
    if (bonus) {
      xp += bonus;
      msgs.push(...messages);
    } else if (messages.length) {
      msgs.push(...messages);
    }

    const leveled = addXp(xp);
    pushSession({
      id: Date.now(),
      type: "training",
      date,
      stageIndex: currentStageIndex(),
      stageName: STAGES[currentStageIndex()].name,
      drills: data.drills,
      notes: data.notes,
      wristFeel: data.wristFeel,
      holdTime: data.holdTime,
      kickCount: data.kickCount,
      xpEarned: xp,
    });
    saveState(state);
    renderAll();
    toast(msgs.join(" · "));
    if (leveled || levelFromXp(state.xp) > prevLevel) celebrateLevelUp();
    showView("home");
  }

  function logRestDay() {
    const date = todayISO();
    const prevLevel = levelFromXp(state.xp);
    // Rest day counts as a logged session for streak purposes
    let xp = 5;
    const { bonus, messages } = applyStreak(date);
    const msgs = ["Rest day logged · +5 XP"];
    if (bonus) {
      xp += bonus;
      msgs.push(...messages);
    } else if (messages.length) {
      msgs.push(...messages);
    }
    const leveled = addXp(xp);
    pushSession({
      id: Date.now(),
      type: "rest",
      date,
      stageName: STAGES[currentStageIndex()].name,
      notes: "Mobility / body care",
      xpEarned: xp,
    });
    saveState(state);
    renderAll();
    toast(msgs.join(" · "));
    if (leveled || levelFromXp(state.xp) > prevLevel) celebrateLevelUp();
    showView("home");
  }

  function attemptUnlock() {
    const next = nextStageIndex();
    if (next === null) {
      toast("You've unlocked every stage!");
      return;
    }
    const date = todayISO();
    const prevLevel = levelFromXp(state.xp);
    // +5 for attempt; user confirms they hit the goal → unlock +20
    const confirmed = window.confirm(
      `Did you hit the goal?\n\n“${STAGES[currentStageIndex()].unlockGoal}”\n\nOK = yes, unlock next stage (+5 attempt +20 unlock).\nCancel = attempt only (+5 XP).`
    );

    let xp = 5;
    let unlocked = false;
    const msgs = ["Unlock attempt +5 XP"];

    if (confirmed) {
      xp += 20;
      unlocked = true;
      msgs.push(`Stage unlocked! +20 XP`);
      if (!state.completedStages.includes(state.unlockedStage)) {
        state.completedStages.push(state.unlockedStage);
      }
      state.unlockedStage = next;
      if (next === STAGES.length - 1) {
        // entering final stage
      }
      // If unlocking the last stage's criteria... actually unlocking advances TO next.
      // When on last stage and they complete its goal, mark last as completed.
    }

    // If already on last stage and they confirm unlock of its goal
    // (next was null handled above). When advancing to last, fine.

    // Special: if user is on last stage, next is null — we returned early.
    // Allow marking last stage complete:
    // Actually re-read: when on stage 5 (index 5), next is null. We should still let them "complete" freestanding.
    // Handled by early return. Add separate path below... for now OK.

    const leveled = addXp(xp);
    pushSession({
      id: Date.now(),
      type: "unlock",
      date,
      stageName: STAGES[confirmed ? next : currentStageIndex()].name,
      notes: confirmed
        ? `Unlocked: ${STAGES[next].name}`
        : `Attempt: ${STAGES[currentStageIndex()].unlockGoal}`,
      xpEarned: xp,
      unlocked,
    });
    saveState(state);
    renderAll();
    toast(msgs.join(" · "));
    if (unlocked) {
      fireConfetti();
    }
    if (leveled || levelFromXp(state.xp) > prevLevel) celebrateLevelUp();
    showView("map");
  }

  function attemptUnlockOrComplete() {
    const next = nextStageIndex();
    if (next === null) {
      // On final stage — mark complete if not already
      const date = todayISO();
      const prevLevel = levelFromXp(state.xp);
      const confirmed = window.confirm(
        `Freestanding mastery check:\n\n“${STAGES[currentStageIndex()].unlockGoal}”\n\nOK = mark stage complete (+5 +20 XP).\nCancel = attempt only (+5 XP).`
      );
      let xp = 5;
      const msgs = ["Unlock attempt +5 XP"];
      let unlocked = false;
      if (confirmed) {
        xp += 20;
        unlocked = true;
        msgs.push("Final stage complete! +20 XP");
        if (!state.completedStages.includes(currentStageIndex())) {
          state.completedStages.push(currentStageIndex());
        }
      }
      const leveled = addXp(xp);
      pushSession({
        id: Date.now(),
        type: "unlock",
        date,
        stageName: STAGES[currentStageIndex()].name,
        notes: confirmed ? "Freestanding stage marked complete" : "Freestanding attempt",
        xpEarned: xp,
        unlocked,
      });
      saveState(state);
      renderAll();
      toast(msgs.join(" · "));
      if (unlocked) fireConfetti();
      if (leveled || levelFromXp(state.xp) > prevLevel) celebrateLevelUp();
      showView("map");
      return;
    }
    attemptUnlock();
  }

  function logBoss(type, value) {
    const date = todayISO();
    const prevLevel = levelFromXp(state.xp);
    const xp = 10;
    const leveled = addXp(xp);
    const label = type === "hold" ? `Max hold ${value}s` : `${value} clean kick-ups`;
    pushSession({
      id: Date.now(),
      type: "boss",
      date,
      stageName: STAGES[currentStageIndex()].name,
      notes: label,
      holdTime: type === "hold" ? value : undefined,
      kickCount: type === "kicks" ? value : undefined,
      xpEarned: xp,
    });
    state.bossLogs.push({ date, type, value });
    saveState(state);
    renderAll();
    toast(`Boss fight logged! +10 XP · ${label}`);
    if (leveled || levelFromXp(state.xp) > prevLevel) celebrateLevelUp();
  }

  // ——— Navigation ———
  function showView(name) {
    document.querySelectorAll(".view").forEach((v) => {
      const active = v.id === `view-${name}`;
      v.classList.toggle("active", active);
      if (active) v.removeAttribute("hidden");
      else v.setAttribute("hidden", "");
    });
    document.querySelectorAll(".tab").forEach((t) => {
      const on = t.dataset.view === name;
      t.classList.toggle("active", on);
      t.setAttribute("aria-selected", on ? "true" : "false");
    });
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  // ——— Events ———
  document.querySelector(".tabs").addEventListener("click", (e) => {
    const btn = e.target.closest(".tab");
    if (!btn) return;
    showView(btn.dataset.view);
  });

  document.querySelectorAll("[data-goto]").forEach((btn) => {
    btn.addEventListener("click", () => showView(btn.dataset.goto));
  });

  document.getElementById("wrist-feel").addEventListener("input", (e) => {
    document.getElementById("wrist-feel-val").textContent = e.target.value;
  });

  document.getElementById("session-form").addEventListener("submit", (e) => {
    e.preventDefault();
    const drills = [...document.querySelectorAll('input[name="drill"]:checked')].map(
      (c) => c.value
    );
    const wristFeel = Number(document.getElementById("wrist-feel").value);
    const holdRaw = document.getElementById("hold-time").value;
    const kickRaw = document.getElementById("kick-count").value;
    const notes = document.getElementById("session-notes").value.trim();

    logTrainingSession({
      drills,
      wristFeel,
      holdTime: holdRaw === "" ? null : Number(holdRaw),
      kickCount: kickRaw === "" ? null : Number(kickRaw),
      notes,
    });

    e.target.reset();
    document.getElementById("wrist-feel").value = 4;
    document.getElementById("wrist-feel-val").textContent = "4";
    renderLogForm();
  });

  document.getElementById("btn-rest-day").addEventListener("click", () => {
    if (window.confirm("Log a mobility-only rest day? (+5 XP, counts toward streak)")) {
      logRestDay();
    }
  });

  document.getElementById("btn-unlock-attempt").addEventListener("click", () => {
    attemptUnlockOrComplete();
  });

  document.getElementById("boss-form").addEventListener("submit", (e) => {
    e.preventDefault();
    const type = document.getElementById("boss-type").value;
    const value = Number(document.getElementById("boss-value").value);
    if (!Number.isFinite(value) || value < 0) {
      toast("Enter a valid number");
      return;
    }
    logBoss(type, value);
    e.target.reset();
  });

  document.getElementById("settings-form").addEventListener("submit", (e) => {
    e.preventDefault();
    const name = document.getElementById("settings-name").value.trim() || "Long";
    state.name = name.slice(0, 32);
    saveState(state);
    renderHome();
    toast("Name saved");
  });

  document.getElementById("btn-reset").addEventListener("click", () => {
    const ok = window.confirm(
      "Reset ALL progress? This clears XP, streak, stages, and history. Cannot be undone."
    );
    if (!ok) return;
    const again = window.confirm("Really wipe everything?");
    if (!again) return;
    state = structuredClone(DEFAULT_STATE);
    state.name = document.getElementById("settings-name").value.trim() || "Long";
    saveState(state);
    renderAll();
    toast("Progress reset");
    showView("home");
  });

  // ——— Install tip (separate key; does not touch game state) ———
  function isInstallTipDismissed() {
    try {
      return localStorage.getItem(INSTALL_TIP_KEY) === "1";
    } catch {
      return false;
    }
  }

  function renderInstallTip() {
    const card = document.getElementById("install-tip-card");
    if (!card) return;
    const standalone =
      window.matchMedia("(display-mode: standalone)").matches ||
      window.navigator.standalone === true;
    if (standalone || isInstallTipDismissed()) {
      card.hidden = true;
      return;
    }
    card.hidden = false;
  }

  document.getElementById("btn-dismiss-install-tip").addEventListener("click", () => {
    try {
      localStorage.setItem(INSTALL_TIP_KEY, "1");
    } catch { /* ignore */ }
    const card = document.getElementById("install-tip-card");
    if (card) card.hidden = true;
  });

  // ——— Init ———
  renderAll();
  renderInstallTip();
  showView("home");
})();
