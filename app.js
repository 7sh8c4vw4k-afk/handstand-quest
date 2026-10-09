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
        {
          id: "wrist-circles",
          label: "Wrist circles & rocks",
          meta: "2 min · gentle",
          image: "exercises/wrist-rocks.png",
          steps: [
            "Kneel or sit and place palms flat on the floor, fingers forward.",
            "Gently rock weight forward and back so wrists flex and extend.",
            "Flip hands to the backs of the hands for a few soft rocks.",
            "Make slow wrist circles both ways with fists open and closed.",
            "Keep pressure light — stop if you feel sharp pain.",
          ],
          cue: "Warm, never force — pain means back off.",
        },
        {
          id: "shoulder-opener",
          label: "Shoulder openers (puppy / thread-the-needle)",
          meta: "2 min",
          image: "exercises/shoulder-opener.png",
          steps: [
            "From all fours, walk hands forward and drop chest toward the floor (puppy pose).",
            "Keep hips stacked over knees; breathe into the armpits.",
            "Return to all fours; slide one arm under the other for thread-the-needle.",
            "Hold each side 20–30s, then switch.",
            "Move slowly — no bouncing into the stretch.",
          ],
          cue: "Soft ribs, long spine — open the shoulders without pinching.",
        },
        {
          id: "plank-holds",
          label: "Plank holds (knees OK)",
          meta: "3 × 20–30s",
          image: "exercises/plank.png",
          steps: [
            "Hands under shoulders, fingers spread, middle finger forward.",
            "Push the floor away and round the upper back slightly (active shoulders).",
            "Squeeze glutes and keep a straight line from head to heels (or knees).",
            "Hold 20–30s; rest; repeat for 3 sets.",
            "If wrists complain, use fists or a slight incline.",
          ],
          cue: "Push the floor away — don't dump into the wrists.",
        },
        {
          id: "scap-pushups",
          label: "Scapular push-ups",
          meta: "2 × 8–10",
          image: "exercises/scap-pushup.png",
          steps: [
            "Set up in a strong plank (knees OK).",
            "Keep elbows locked soft-straight — arms stay long.",
            "Let the chest sink as shoulder blades pinch together.",
            "Push the floor away to spread the shoulder blades wide.",
            "Move slowly for 8–10 reps; that is one set.",
          ],
          cue: "Arms stay straight — only the shoulder blades move.",
        },
        {
          id: "hollow-hold",
          label: "Hollow body hold",
          meta: "3 × 15–20s",
          image: "exercises/hollow.png",
          steps: [
            "Lie on your back; press the lower back into the floor.",
            "Lift shoulders and legs into a gentle banana curve.",
            "Arms reach overhead or by your sides for an easier version.",
            "Hold 15–20s while breathing calmly; rest; repeat.",
            "If the low back peels up, bend the knees or lower the legs.",
          ],
          cue: "Low back glued down — hollow is a shape, not a crunch.",
        },
      ],
    },
    {
      id: "pike",
      name: "Pike / elevated pike",
      unlockGoal: "Lean ~10s with most weight on hands",
      tips: "Stack shoulders over wrists. Look at the floor between hands.",
      drills: [
        {
          id: "wrist-warm",
          label: "Wrist warm-up",
          meta: "90 sec",
          image: "exercises/wrist-rocks.png",
          steps: [
            "Palms on floor; rock gently forward, back, and side to side.",
            "Add light wrist circles both directions.",
            "Finish with a few fist rocks if palms feel ready.",
          ],
          cue: "90 seconds of gentle heat before you load the wrists.",
        },
        {
          id: "pike-hold",
          label: "Pike hold (hips high)",
          meta: "3 × 20–30s",
          image: "exercises/pike-hold.png",
          steps: [
            "Hands and feet on the floor; lift hips into an inverted V.",
            "Press shoulders toward the floor over your wrists.",
            "Look at the floor between your hands; keep elbows soft-locked.",
            "Hold 20–30s; walk feet in closer only if shoulders stay stacked.",
            "Repeat for 3 sets with easy rest between.",
          ],
          cue: "Hips high, shoulders over wrists — think stacked, not slumped.",
        },
        {
          id: "elevated-pike",
          label: "Elevated pike lean (feet on box/couch)",
          meta: "4 × 8–12s",
          image: "exercises/elevated-pike.png",
          steps: [
            "Place feet on a stable box, couch, or chair; hands on the floor.",
            "Walk hands back until shoulders are roughly over wrists.",
            "Lean a little more weight into the hands for 8–12s.",
            "Keep ribs tucked; don't sag the lower back.",
            "Step down to rest; repeat 4 quality leans.",
          ],
          cue: "Most of your weight should feel like it's in your hands.",
        },
        {
          id: "shoulder-taps",
          label: "Pike shoulder taps",
          meta: "2 × 6/side",
          image: "exercises/pike-hold.png",
          steps: [
            "Set a solid pike with hips high and shoulders loaded.",
            "Shift slightly onto one hand and tap the opposite shoulder.",
            "Replace the hand, then tap the other side.",
            "Keep hips quiet — minimize twist and sway.",
            "Do 6 taps per side for 2 rounds.",
          ],
          cue: "Quiet hips — taps teach balance without losing the pike.",
        },
        {
          id: "wall-facing-lean",
          label: "Wall-facing lean (hands far from wall)",
          meta: "3 × 10s",
          image: "exercises/elevated-pike.png",
          steps: [
            "Face a wall; place hands on the floor a comfortable distance away.",
            "Walk feet in so hips rise and shoulders load over the wrists.",
            "Lean gently toward the wall feeling weight shift into the hands.",
            "Hold ~10s with calm breathing; walk out to rest.",
            "Keep the wall as a visual guide — you are not kicking up yet.",
          ],
          cue: "Load the hands first; the wall is a guide, not a crash pad.",
        },
      ],
    },
    {
      id: "wall-walk",
      name: "Wall walk-up",
      unlockGoal: "Stay 10–15s with control",
      tips: "Walk feet up slowly. Keep ribs in; don't dump into the lower back.",
      drills: [
        {
          id: "wrist-warm2",
          label: "Wrist + shoulder warm-up",
          meta: "2 min",
          image: "exercises/wrist-rocks.png",
          steps: [
            "Do palm rocks, fist rocks, and wrist circles for about a minute.",
            "Add puppy pose or thread-the-needle for 30–45s per side.",
            "Finish with a short plank or pike to wake the shoulders.",
          ],
          cue: "Wrists warm, shoulders open — then go to the wall.",
        },
        {
          id: "elevated-pike2",
          label: "Elevated pike refresher",
          meta: "2 × 15s",
          image: "exercises/elevated-pike.png",
          steps: [
            "Feet elevated, hands on floor, shoulders over wrists.",
            "Hold a strong lean for ~15s focusing on stacked shoulders.",
            "Rest, then repeat once more before wall walks.",
          ],
          cue: "Refresh the lean so wall walks feel familiar.",
        },
        {
          id: "wall-walks",
          label: "Wall walk-ups",
          meta: "5–8 reps · stay 5–10s at top",
          image: "exercises/wall-walk.png",
          steps: [
            "Start in a plank with feet near the wall, hands farther out.",
            "Walk feet up the wall as you walk hands closer to the wall.",
            "Stop when you feel stable — nose can stay a bit away at first.",
            "Hold 5–10s, then walk back down with control.",
            "Clear space behind you; never dive off the wall.",
          ],
          cue: "Slow feet, quiet core — walk down as carefully as you walk up.",
        },
        {
          id: "chest-partial",
          label: "Chest toward wall (partial)",
          meta: "3 × 8–12s",
          image: "exercises/chest-to-wall.png",
          steps: [
            "From a wall walk, bring the chest a little closer to the wall.",
            "Keep arms straight and ribs pulled in.",
            "Hold the partial position 8–12s without collapsing the shoulders.",
            "Walk down; rest; repeat for 3 sets.",
            "Leave a gap if full chest-to-wall still feels too intense.",
          ],
          cue: "Closer chest, same stack — progress gap by gap.",
        },
        {
          id: "scap-holds",
          label: "Scapular holds upside-down",
          meta: "3 × 5s at top of walk",
          image: "exercises/scap-pushup.png",
          steps: [
            "Walk up to a comfortable chest-near-wall position.",
            "With elbows soft-locked, shrug shoulders toward ears, then push tall.",
            "Find the \"pushed away\" position and hold ~5s.",
            "Keep breathing; don't banana the lower back.",
            "Walk down and repeat for 3 short holds.",
          ],
          cue: "Push the floor away upside-down — active shoulders protect you.",
        },
      ],
    },
    {
      id: "chest-wall",
      name: "Chest-to-wall hold",
      unlockGoal: "Clean 20s hold",
      tips: "Nose close to wall, hips stacked. Breathe calmly.",
      drills: [
        {
          id: "warm3",
          label: "Full warm-up circuit",
          meta: "3 min",
          image: "exercises/wrist-rocks.png",
          steps: [
            "Wrist rocks and circles (~60s).",
            "Shoulder opener: puppy or thread-the-needle (~60s).",
            "Pike or elevated pike lean (~60s) to load the shoulders.",
          ],
          cue: "Three minutes now saves sore wrists later.",
        },
        {
          id: "wall-walk-entry",
          label: "Wall walk into chest-to-wall",
          meta: "warm-up set",
          image: "exercises/wall-walk.png",
          steps: [
            "Walk feet up the wall with controlled hand steps.",
            "Bring chest close so the body is nearly vertical.",
            "Pause briefly to check stack: wrists → shoulders → hips.",
            "Walk down smoothly; treat this as a warm-up entry, not a max hold.",
          ],
          cue: "Enter tall and quiet — save the long holds for the next drill.",
        },
        {
          id: "ctw-holds",
          label: "Chest-to-wall holds",
          meta: "5 × 10–20s",
          image: "exercises/chest-to-wall.png",
          steps: [
            "Chest and nose close to the wall; arms straight.",
            "Stack hips over shoulders; point toes; squeeze legs together.",
            "Push the floor away and keep ribs from flaring.",
            "Hold 10–20s with calm breaths; walk down to rest.",
            "Build toward a clean 20s across your sets.",
          ],
          cue: "Nose to wall, ribs in, push the floor — breathe.",
        },
        {
          id: "heel-pulls",
          label: "Heel pulls off wall (tiny)",
          meta: "4 × 3–5s",
          image: "exercises/heel-pull.png",
          steps: [
            "Set a solid chest-to-wall handstand.",
            "Lightly peel both heels an inch off the wall.",
            "Balance for 3–5s using fingertips and shoulders, then return heels.",
            "Keep the pull tiny — this is not a big freestanding attempt.",
            "Repeat for 4 quality pulls with full rest as needed.",
          ],
          cue: "Tiny peel, tall shape — feel the balance without forcing it.",
        },
        {
          id: "shoulder-endurance",
          label: "Shoulder endurance set",
          meta: "1 × max comfortable",
          image: "exercises/chest-to-wall.png",
          steps: [
            "Enter chest-to-wall with your best stack.",
            "Hold as long as form stays clean and breathing stays easy.",
            "Stop before shoulders shake out of position or wrists complain.",
            "Walk down with control; note the time for your log.",
          ],
          cue: "Quality max — end the hold while form is still proud.",
        },
      ],
    },
    {
      id: "kick-up",
      name: "Kick-up practice",
      unlockGoal: "Kick into wall hold 5 times with control",
      tips: "Soft kick, not a flop. Spot the landing. Use wall as a safety net.",
      drills: [
        {
          id: "warm4",
          label: "Warm-up + 1 chest-to-wall",
          meta: "3–4 min",
          image: "exercises/chest-to-wall.png",
          steps: [
            "Wrist and shoulder warm-up for 2 minutes.",
            "One easy wall walk into a short chest-to-wall hold.",
            "Shake out the wrists; then set up for kick-ups.",
          ],
          cue: "Prime the shape once before you start kicking.",
        },
        {
          id: "lunge-entries",
          label: "Lunge entries to wall",
          meta: "8–12 attempts",
          image: "exercises/kick-up.png",
          steps: [
            "Hands on floor, lead leg in a short lunge, wall behind you.",
            "Shift weight onto hands, then float the back leg up.",
            "Aim to arrive lightly on the wall — not a slam.",
            "Step down to your feet; reset the lunge each rep.",
            "Film a few attempts if you can to check the kick size.",
          ],
          cue: "Soft kick into the wall — arrive, don't crash.",
        },
        {
          id: "controlled-kicks",
          label: "Controlled kick-ups (catch & hold)",
          meta: "goal: 5 clean",
          image: "exercises/kick-up.png",
          steps: [
            "Same lunge entry, but catch the handstand against the wall.",
            "Join the legs and hold briefly with active shoulders.",
            "Count a kick \"clean\" only if you control the arrival and exit.",
            "Work toward 5 clean catches; quality beats volume.",
            "Rest whenever the kick gets wild or wrists feel tired.",
          ],
          cue: "Catch, stack, breathe — five controlled arrivals is the win.",
        },
        {
          id: "bail-practice",
          label: "Safe bail / cartwheel out practice",
          meta: "3–5 reps",
          image: "exercises/bail.png",
          steps: [
            "From a mild kick or wall hold, practice rotating sideways to your feet.",
            "Turn the hips and step out like a gentle cartwheel — no diving on the head.",
            "Keep eyes on the landing zone; bend the knees on arrival.",
            "Clear the space of furniture and hard edges first.",
            "Repeat 3–5 calm bails so the pattern feels automatic.",
          ],
          cue: "Bail sideways to your feet — never fold over your neck.",
        },
        {
          id: "hold-after",
          label: "Hold after successful kick",
          meta: "as long as comfortable",
          image: "exercises/chest-to-wall.png",
          steps: [
            "After a clean kick-up, settle into a tall wall handstand.",
            "Push the floor, squeeze legs, and breathe.",
            "Hold only while form stays solid; then bail or walk down safely.",
            "Treat extra hold time as a bonus, not a must.",
          ],
          cue: "Enjoy the hold you earned — leave while it still looks clean.",
        },
      ],
    },
    {
      id: "freestanding",
      name: "Freestanding attempts",
      unlockGoal: "Short holds away from wall — keep exploring!",
      tips: "Short attempts beat long fails. Film yourself. Celebrate 1–2 second balances.",
      drills: [
        {
          id: "warm5",
          label: "Full prep + chest-to-wall",
          meta: "4 min",
          image: "exercises/wrist-rocks.png",
          steps: [
            "Wrists, shoulders, and a short pike or elevated lean.",
            "One solid chest-to-wall hold to groove the stack.",
            "Shake out; then move slightly away from the wall for attempts.",
          ],
          cue: "Prep fully — freestanding needs warm wrists and a clear stack.",
        },
        {
          id: "kick-away",
          label: "Kick-ups slightly off wall",
          meta: "10–15 attempts",
          image: "exercises/kick-up.png",
          steps: [
            "Set hands a small step farther from the wall than usual.",
            "Use a soft controlled kick; try to float before lightly touching the wall.",
            "If you miss, bail safely to your feet.",
            "Take many short attempts rather than one exhausted fight.",
            "Stay within a range where the wall still catches big overkicks.",
          ],
          cue: "Small gap from the wall — practice the float, keep the safety net.",
        },
        {
          id: "toe-pull",
          label: "Toe-pull balances (back to wall)",
          meta: "6–8",
          image: "exercises/toe-pull.png",
          steps: [
            "Kick or walk into a back-to-wall handstand (belly faces room).",
            "Lightly touch the wall with toes, then peel toes off to balance.",
            "Use fingertips and shoulders to stay up for a second or two.",
            "Return toes to the wall when you tip; reset and try again.",
            "Aim for 6–8 quality pulls, not marathon holds.",
          ],
          cue: "Toes off, find the float — wall is still right there.",
        },
        {
          id: "free-holds",
          label: "Freestanding attempts",
          meta: "quality over quantity",
          image: "exercises/freestanding.png",
          steps: [
            "Kick up in open space (or with a spotter / soft clear zone).",
            "Look for a brief balance: 1–2 seconds counts as a win.",
            "Exit with a planned bail every time — no stubborn fights.",
            "Film attempts to check kick size and shoulder stack.",
            "Stop while you're still fresh enough to land well.",
          ],
          cue: "Celebrate seconds — short clean floats beat long messy ones.",
        },
        {
          id: "cool-down",
          label: "Wrist cool-down stretches",
          meta: "2 min",
          image: "exercises/cool-down.png",
          steps: [
            "Sit or kneel; place palms down with fingers toward you and lean gently.",
            "Switch to fingers facing forward for a lighter stretch.",
            "Stretch the backs of the hands if they feel tight.",
            "Shake the hands out and do a few easy finger spreads.",
            "Ice or rest if anything feels irritated after training.",
          ],
          cue: "Gentle stretch and shake-out — take care of your wrists.",
        },
      ],
    },
  ];


  const DAILY_MINI = {
    title: "Daily Mini",
    durationLabel: "~5–8 min",
    tip: "Soft and steady. Pain = stop. This keeps wrists and shoulders happy between quest days.",
    drills: [
      {
        id: "mini-wrist",
        label: "Wrist rocks / circles",
        meta: "60s · gentle",
        image: "exercises/wrist-rocks.png",
        steps: [
          "Kneel or sit; place palms flat, fingers forward.",
          "Rock weight softly forward and back for ~20s.",
          "Add slow wrist circles both ways with open hands.",
          "Optional: light fist rocks if palms feel ready.",
          "Keep pressure easy — sharp pain means stop.",
        ],
        cue: "Warm the wrists, never force them.",
      },
      {
        id: "mini-shoulder",
        label: "Shoulder / chest opener",
        meta: "60s/side or ~90s total",
        image: "exercises/shoulder-opener.png",
        steps: [
          "Puppy pose: from all fours, walk hands forward and lower the chest.",
          "Or stand in a doorway and place forearms on the frame; step through gently.",
          "Breathe into the chest and armpits for ~60s per side (or ~90s total).",
          "Keep ribs soft — no aggressive lean.",
          "Ease out slowly if anything pinches.",
        ],
        cue: "Open the front of the shoulders without forcing the stretch.",
      },
      {
        id: "mini-cat-cow",
        label: "Cat-cow or thread-the-needle",
        meta: "60–90s",
        image: "exercises/cat-cow.png",
        steps: [
          "On all fours, inhale to drop the belly and lift the gaze (cow).",
          "Exhale to round the spine and tuck the chin (cat).",
          "Flow slowly for ~45s, matching breath to movement.",
          "Optional: slide one arm under for thread-the-needle, 20–30s each side.",
          "Move like warm oil — no yanking.",
        ],
        cue: "Wake the thoracic spine with easy breath-led motion.",
      },
      {
        id: "mini-fold",
        label: "Standing forward fold / pike stretch",
        meta: "60s",
        image: "exercises/forward-fold.png",
        steps: [
          "Stand with soft knees; hinge at the hips and fold forward.",
          "Let the head hang; hold elbows or reach toward the floor.",
          "Bend the knees as much as you need — hamstrings should feel a stretch, not a strain.",
          "Stay ~60s with calm breathing; slowly roll up.",
          "Swap for a seated pike if standing feels wobbly.",
        ],
        cue: "Soft knees are fine — length over force.",
      },
      {
        id: "mini-wall-angels",
        label: "Wall angels or scap squeezes",
        meta: "8–10 reps",
        image: "exercises/wall-angels.png",
        steps: [
          "Stand with back lightly against a wall, feet a step forward.",
          "Arms in a cactus/W shape; slide them up toward a Y, then back down.",
          "Keep ribs down and elbows/wrists as close to the wall as comfortable.",
          "Or skip the wall: squeeze shoulder blades together for 8–10 slow reps.",
          "Stop short of pain in the neck or shoulders.",
        ],
        cue: "Quiet ribs, smooth scap motion — quality over range.",
      },
      {
        id: "mini-core",
        label: "Gentle hollow or dead bug",
        meta: "20–30s × 2",
        image: "exercises/hollow.png",
        steps: [
          "Lie on your back; press the low back into the floor.",
          "Hollow: lift shoulders and legs slightly into a soft banana, or bend knees to shorten the lever.",
          "Dead bug option: extend opposite arm and leg while keeping the low back glued down.",
          "Hold or alternate for 20–30s; rest; repeat once more.",
          "If the back peels up, make it smaller — bent knees are a win.",
        ],
        cue: "Low back stays down — light core, not a crunch contest.",
      },
    ],
  };

  const DEFAULT_STATE = {
    name: "Long",
    xp: 0,
    streak: 0,
    unlockedStage: 0, // index of current stage (highest unlocked)
    completedStages: [], // indices fully unlocked past
    sessions: [],
    lastSessionDate: null,
    bossLogs: [],
    miniStreak: 0,
    lastMiniDate: null,
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

  function escapeHtml(str) {
    return String(str)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
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

  function applyMiniStreak(miniDate) {
    let messages = [];
    if (!state.lastMiniDate) {
      state.miniStreak = 1;
    } else {
      const gap = daysBetween(state.lastMiniDate, miniDate);
      if (gap === 0) {
        // same day — streak unchanged (XP gated separately)
      } else if (gap === 1) {
        state.miniStreak += 1;
      } else if (gap > 1) {
        state.miniStreak = 1;
        messages.push("Mini streak reset");
      }
    }
    state.lastMiniDate = miniDate;
    return { messages };
  }

  function miniDoneToday() {
    return state.lastMiniDate === todayISO();
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
    renderMini();
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
      let typeBit;
      if (last.type === "rest") typeBit = "Mobility rest day";
      else if (last.type === "mini") typeBit = "Daily Mini";
      else if (last.type === "boss") typeBit = "Boss fight";
      else if (last.type === "unlock") typeBit = "Unlock attempt";
      else typeBit = `Stage: ${last.stageName || "—"}`;
      const parts = [
        formatDate(last.date),
        typeBit,
        `+${last.xpEarned} XP`,
      ];
      if (last.wristFeel) parts.push(`Wrist ${last.wristFeel}/5`);
      if (last.holdTime) parts.push(`Hold ${last.holdTime}s`);
      if (last.kickCount) parts.push(`${last.kickCount} kicks`);
      summary.textContent = parts.join(" · ");
    }

    const miniStatus = document.getElementById("mini-status-text");
    const miniBadge = document.getElementById("mini-streak-badge");
    const miniBtn = document.getElementById("btn-goto-mini");
    const miniCard = document.getElementById("mini-status-card");
    if (miniStatus && miniBadge) {
      const done = miniDoneToday();
      const streak = state.miniStreak || 0;
      miniBadge.textContent = `🌱 ${streak}`;
      if (done) {
        miniStatus.textContent = `Done today · mini streak ${streak}`;
        miniStatus.classList.remove("muted");
        if (miniCard) miniCard.classList.add("mini-done");
        if (miniBtn) miniBtn.textContent = "View Daily Mini";
      } else {
        miniStatus.textContent = streak
          ? `Not done today · mini streak ${streak} · ~5–8 min`
          : "Not done today · ~5–8 min stretch";
        miniStatus.classList.add("muted");
        if (miniCard) miniCard.classList.remove("mini-done");
        if (miniBtn) miniBtn.textContent = "Open Daily Mini";
      }
    }
  }


  function renderMini() {
    const list = document.getElementById("mini-drills");
    if (!list) return;
    list.innerHTML = DAILY_MINI.drills
      .map((d, i) => {
        const open = i === 0 ? " open" : "";
        const steps = (d.steps || [])
          .map((s) => `<li>${escapeHtml(s)}</li>`)
          .join("");
        return `<li class="drill-card${open}" data-drill-id="${escapeHtml(d.id)}">
          <button type="button" class="drill-toggle" aria-expanded="${i === 0 ? "true" : "false"}">
            <span class="drill-toggle-main">
              <strong>${escapeHtml(d.label)}</strong>
              <span class="drill-meta">${escapeHtml(d.meta)}</span>
            </span>
            <span class="drill-hint">${i === 0 ? "How-to" : "Tap for how-to"}</span>
            <span class="drill-chevron" aria-hidden="true"></span>
          </button>
          <div class="drill-detail"${i === 0 ? "" : " hidden"}>
            <img class="drill-image" src="${escapeHtml(d.image)}" alt="${escapeHtml(d.label)} illustration" loading="lazy" width="720" height="480" />
            <ol class="drill-steps">${steps}</ol>
            <p class="drill-cue">${escapeHtml(d.cue || "")}</p>
          </div>
        </li>`;
      })
      .join("");

    const done = miniDoneToday();
    const banner = document.getElementById("mini-done-banner");
    const btn = document.getElementById("btn-log-mini");
    if (banner) {
      banner.hidden = !done;
      if (done) {
        banner.textContent = `Done today · +5 XP · mini streak ${state.miniStreak || 0}`;
      }
    }
    if (btn) {
      btn.disabled = done;
      btn.textContent = done ? "Already logged today" : "Log Daily Mini (+5 XP)";
    }
  }

  function renderQuest() {
    const idx = currentStageIndex();
    const stage = STAGES[idx];
    document.getElementById("quest-stage-label").textContent =
      `Stage ${idx + 1} of ${STAGES.length} · ~12–15 min`;

    const list = document.getElementById("quest-drills");
    list.innerHTML = stage.drills
      .map((d, i) => {
        const open = i === 0 ? " open" : "";
        const steps = (d.steps || [])
          .map((s) => `<li>${escapeHtml(s)}</li>`)
          .join("");
        return `<li class="drill-card${open}" data-drill-id="${escapeHtml(d.id)}">
          <button type="button" class="drill-toggle" aria-expanded="${i === 0 ? "true" : "false"}">
            <span class="drill-toggle-main">
              <strong>${escapeHtml(d.label)}</strong>
              <span class="drill-meta">${escapeHtml(d.meta)}</span>
            </span>
            <span class="drill-hint">${i === 0 ? "How-to" : "Tap for how-to"}</span>
            <span class="drill-chevron" aria-hidden="true"></span>
          </button>
          <div class="drill-detail"${i === 0 ? "" : " hidden"}>
            <img class="drill-image" src="${escapeHtml(d.image)}" alt="${escapeHtml(d.label)} illustration" loading="lazy" width="720" height="480" />
            <ol class="drill-steps">${steps}</ol>
            <p class="drill-cue">${escapeHtml(d.cue || "")}</p>
          </div>
        </li>`;
      })
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
      .map((d, i) => {
        const open = i === 0 ? " open" : "";
        const steps = (d.steps || [])
          .map((s) => `<li>${escapeHtml(s)}</li>`)
          .join("");
        return `<div class="log-drill-card${open}" data-drill-id="${escapeHtml(d.id)}">
          <div class="log-drill-top">
            <label class="check-item">
              <input type="checkbox" name="drill" value="${escapeHtml(d.id)}" />
              <span class="check-label-text">
                <strong>${escapeHtml(d.label)}</strong>
                <span class="drill-meta">${escapeHtml(d.meta)}</span>
              </span>
            </label>
            <button type="button" class="log-howto-btn" aria-expanded="${i === 0 ? "true" : "false"}">
              ${i === 0 ? "Hide how-to" : "How-to"}
            </button>
          </div>
          <div class="drill-detail"${i === 0 ? "" : " hidden"}>
            <img class="drill-image" src="${escapeHtml(d.image)}" alt="${escapeHtml(d.label)} illustration" loading="lazy" width="720" height="480" />
            <ol class="drill-steps">${steps}</ol>
            <p class="drill-cue">${escapeHtml(d.cue || "")}</p>
          </div>
        </div>`;
      })
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
            : s.type === "mini"
              ? "Daily Mini"
              : s.type === "boss"
                ? "Boss fight"
                : s.type === "unlock"
                  ? "Unlock attempt"
                  : "Training";
        const meta = [];
        if (s.stageName) meta.push(s.stageName);
        if (s.type === "mini") meta.push(DAILY_MINI.durationLabel + " stretch");
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


  function logDailyMini() {
    const date = todayISO();
    if (state.lastMiniDate === date) {
      toast("Daily Mini already logged today — come back tomorrow");
      showView("mini");
      return;
    }
    const prevLevel = levelFromXp(state.xp);
    const xp = 5;
    const { messages } = applyMiniStreak(date);
    const msgs = [`Daily Mini done! +${xp} XP`, `Mini streak ${state.miniStreak}`];
    if (messages.length) msgs.push(...messages);
    // Does NOT call applyStreak — main session streak unchanged
    const leveled = addXp(xp);
    pushSession({
      id: Date.now(),
      type: "mini",
      date,
      stageName: DAILY_MINI.title,
      notes: "Wrist · shoulder · thoracic · fold · scap · light core",
      drills: DAILY_MINI.drills.map((d) => d.id),
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

  document.getElementById("btn-log-mini").addEventListener("click", () => {
    if (miniDoneToday()) {
      toast("Daily Mini already logged today");
      return;
    }
    if (window.confirm("Log today's Daily Mini? (+5 XP once per day · does not change main streak)")) {
      logDailyMini();
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

  // ——— Drill expand (Quest + Log) ———
  function bindDrillListToggle(listEl) {
    if (!listEl) return;
    listEl.addEventListener("click", (e) => {
      const btn = e.target.closest(".drill-toggle");
      if (!btn) return;
      const card = btn.closest(".drill-card");
      if (!card) return;
      const detail = card.querySelector(".drill-detail");
      const open = !card.classList.contains("open");
      card.classList.toggle("open", open);
      btn.setAttribute("aria-expanded", open ? "true" : "false");
      const hint = btn.querySelector(".drill-hint");
      if (hint) hint.textContent = open ? "How-to" : "Tap for how-to";
      if (detail) {
        if (open) detail.removeAttribute("hidden");
        else detail.setAttribute("hidden", "");
      }
    });
  }

  bindDrillListToggle(document.getElementById("quest-drills"));
  bindDrillListToggle(document.getElementById("mini-drills"));

  document.getElementById("drill-checkboxes").addEventListener("click", (e) => {
    const btn = e.target.closest(".log-howto-btn");
    if (!btn) return;
    e.preventDefault();
    const card = btn.closest(".log-drill-card");
    if (!card) return;
    const detail = card.querySelector(".drill-detail");
    const open = !card.classList.contains("open");
    card.classList.toggle("open", open);
    btn.setAttribute("aria-expanded", open ? "true" : "false");
    btn.textContent = open ? "Hide how-to" : "How-to";
    if (detail) {
      if (open) detail.removeAttribute("hidden");
      else detail.setAttribute("hidden", "");
    }
  });

  // ——— Init ———
  renderAll();
  renderInstallTip();
  showView("home");
})();
