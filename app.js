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


  const OFFICE_SNACK_XP = 3;
  const OFFICE_SNACK_MAX_PER_DAY = 3;

  const OFFICE_SNACKS = [
    {
      id: "neck-traps",
      name: "Neck & traps",
      durationLabel: "~2–3 min",
      blurb: "Unclench the desk shrug",
      drills: [
        {
          id: "snack-shoulder-rolls",
          label: "Shoulder rolls",
          meta: "30–40s",
          image: "exercises/shoulder-rolls.png",
          steps: [
            "Sit tall at your chair; arms hang soft by your sides.",
            "Slowly roll shoulders up, back, and down for ~20s.",
            "Reverse: up, forward, down for another ~15s.",
            "Keep the jaw loose — no aggressive circling.",
          ],
          cue: "Quiet rolls — melt the upper traps, don’t force them.",
        },
        {
          id: "snack-seated-neck",
          label: "Seated side-neck stretch",
          meta: "25s/side",
          image: "exercises/seated-neck.png",
          steps: [
            "Sit tall; gently tip one ear toward the same shoulder.",
            "Optional: rest a light hand on the side of the head — never pull hard.",
            "Breathe calmly ~25s; return to center; switch sides.",
            "Skip any sharp pain, dizziness, or nerve-like zaps.",
          ],
          cue: "Soft ear-to-shoulder only — no cracking, no yanking.",
        },
        {
          id: "snack-chin-nods",
          label: "Gentle chin nods",
          meta: "8–10 slow reps",
          image: "exercises/seated-breath.png",
          steps: [
            "Sit tall; imagine a string lifting the crown of your head.",
            "Make a tiny double-chin nod: lengthen the back of the neck.",
            "Release halfway; repeat 8–10 slow, small reps.",
            "Keep range tiny — this is posture, not a crunch.",
          ],
          cue: "Small nods lengthen the neck; big ones strain it.",
        },
        {
          id: "snack-trap-release",
          label: "Hands-behind-back shoulder open",
          meta: "30s",
          image: "exercises/shoulder-rolls.png",
          steps: [
            "Seated or standing, clasp hands lightly behind the back (or hold a water bottle).",
            "Draw shoulder blades gently together and down.",
            "Lift the chest a little; breathe for ~30s.",
            "Release if shoulders pinch — keep it easy.",
          ],
          cue: "Open the chest to quiet the desk hunch.",
        },
      ],
    },
    {
      id: "chest-posture",
      name: "Chest & open posture",
      durationLabel: "~3 min",
      blurb: "Undo the keyboard hunch",
      drills: [
        {
          id: "snack-doorway",
          label: "Doorway / wall pec stretch",
          meta: "30s/side",
          image: "exercises/doorway-chest.png",
          steps: [
            "Stand in a doorway; place one forearm on the frame at about shoulder height.",
            "Step the same-side foot forward gently until you feel a mild chest stretch.",
            "Hold ~30s with easy breathing; switch sides.",
            "Keep ribs down — no aggressive lean.",
          ],
          cue: "Mild chest open is enough; leave hero stretches at home.",
        },
        {
          id: "snack-wall-angels",
          label: "Wall angels or scap squeezes",
          meta: "8 smooth reps",
          image: "exercises/wall-angels.png",
          steps: [
            "Stand with back lightly to a wall, or sit and squeeze shoulder blades.",
            "Arms in a soft W; slide toward a Y if comfortable, then return.",
            "Do ~8 smooth reps without forcing elbows to the wall.",
            "Stop short of neck tension.",
          ],
          cue: "Quiet ribs, smooth scap motion.",
        },
        {
          id: "snack-chest-clasp",
          label: "Hands-behind-back clasp",
          meta: "30–40s",
          image: "exercises/doorway-chest.png",
          steps: [
            "Stand or sit; clasp hands behind you (or hold opposite elbows).",
            "Gently draw the arms away from the back and lift the sternum.",
            "Breathe into the chest for 30–40s.",
            "Keep the neck long — don’t crank the head back.",
          ],
          cue: "Lift the chest, soften the neck.",
        },
        {
          id: "snack-posture-reset",
          label: "Seated posture reset + breath",
          meta: "45s",
          image: "exercises/seated-breath.png",
          steps: [
            "Plant feet; sit on the sit-bones; lengthen the spine.",
            "Relax the shoulders down; soften the gaze.",
            "Three to five slow breaths: in through the nose, longer out.",
            "Return to work a little taller.",
          ],
          cue: "A calm breath seals the posture reset.",
        },
      ],
    },
    {
      id: "hips",
      name: "Hips",
      durationLabel: "~3–4 min",
      blurb: "Seated + optional standing",
      drills: [
        {
          id: "snack-figure4",
          label: "Seated figure-4",
          meta: "35s/side",
          image: "exercises/seated-figure4.png",
          steps: [
            "Sit tall; cross one ankle over the opposite thigh (figure-4).",
            "Keep the foot flexed; hinge forward slightly only if comfortable.",
            "Hold ~35s; switch sides.",
            "Prop with a hand on the chair if balance feels tippy.",
          ],
          cue: "Glute stretch should feel dull and kind — never sharp in the knee.",
        },
        {
          id: "snack-standing-hip",
          label: "Standing hip-flexor (desk assist)",
          meta: "30s/side · optional",
          image: "exercises/standing-hip.png",
          steps: [
            "Stand behind or beside your desk; hold the edge for balance.",
            "Step one foot back into a short lunge; tuck the pelvis gently under.",
            "Feel a mild stretch in the front of the back hip; hold ~30s; switch.",
            "Skip if knees complain — seated figure-4 alone is enough.",
          ],
          cue: "Tuck the pelvis more than you lunge deeper.",
        },
        {
          id: "snack-hip-circles",
          label: "Seated hip circles / marches",
          meta: "40s",
          image: "exercises/seated-figure4.png",
          steps: [
            "Sit tall near the front of the chair.",
            "Lift one knee a little and draw a slow circle; switch directions.",
            "Alternate legs for ~40s total, or do seated marches.",
            "Stay quiet and controlled — office-friendly.",
          ],
          cue: "Wake the hips without leaving the chair.",
        },
        {
          id: "snack-hip-breath",
          label: "Easy seated fold or breath",
          meta: "30s",
          image: "exercises/seated-breath.png",
          steps: [
            "Feet planted; hinge slightly from the hips with a long spine, or just sit tall.",
            "Shake the legs out softly; take three easy breaths.",
            "Return upright when ready.",
          ],
          cue: "Finish soft — hips like patience more than force.",
        },
      ],
    },
    {
      id: "wrists-forearms",
      name: "Wrists & forearms",
      durationLabel: "~2–3 min",
      blurb: "Mouse & keyboard relief",
      drills: [
        {
          id: "snack-desk-wrist",
          label: "Desk wrist flex / extend",
          meta: "30s each way",
          image: "exercises/desk-wrist.png",
          steps: [
            "Seated at your desk, place one palm on the desk fingers toward you (gentle wrist stretch).",
            "Hold ~20–30s; then flip to the back of the hand for the other direction if comfortable.",
            "Switch hands.",
            "Keep pressure light — sharp pain means stop.",
          ],
          cue: "Warm the wrists like you warm them for handstands — gently.",
        },
        {
          id: "snack-wrist-rocks",
          label: "Wrist rocks / circles",
          meta: "45s",
          image: "exercises/wrist-rocks.png",
          steps: [
            "Hands on desk or thighs; rock palms gently forward and back.",
            "Add slow wrist circles both ways with open hands.",
            "Optional: light prayer stretch at the chest for 15s.",
            "Stay quiet and pain-free.",
          ],
          cue: "Circles should feel oily, not crunchy.",
        },
        {
          id: "snack-forearm",
          label: "Forearm stretch + shake-out",
          meta: "30s/side + shake",
          image: "exercises/desk-wrist.png",
          steps: [
            "Extend one arm; gently pull fingers back with the other hand (palm up / palm down variants).",
            "~20s each version per arm.",
            "Finish by shaking hands out like you flicked water off.",
          ],
          cue: "Forearms do the typing — thank them softly.",
        },
        {
          id: "snack-finger-spread",
          label: "Finger spreads & fist opens",
          meta: "20s",
          image: "exercises/desk-wrist.png",
          steps: [
            "Spread all fingers wide, hold 3s; make soft fists; open again.",
            "Repeat ~5 times; wiggle fingers.",
            "Return to the keyboard with softer hands.",
          ],
          cue: "Tiny reset, big difference for mouse grip.",
        },
      ],
    },
    {
      id: "upper-back",
      name: "Upper back / thoracic",
      durationLabel: "~3 min",
      blurb: "Twist out the chair hunch",
      drills: [
        {
          id: "snack-chair-twist",
          label: "Seated chair twist",
          meta: "30s/side",
          image: "exercises/chair-twist.png",
          steps: [
            "Sit tall; plant feet; rotate gently toward one side.",
            "Hold the chair back or rest a hand on the opposite thigh — no yanking.",
            "Inhale length; exhale a little more rotation; ~30s; switch.",
            "Keep the twist in the mid-back, not a neck crank.",
          ],
          cue: "Length first, then twist — never force the neck.",
        },
        {
          id: "snack-cat-cow-seat",
          label: "Seated cat-cow",
          meta: "45–60s",
          image: "exercises/cat-cow.png",
          steps: [
            "Hands on knees; inhale to arch gently (open chest).",
            "Exhale to round the upper back and soft-tuck the chin.",
            "Flow with the breath for ~45–60s.",
            "Keep range small enough for a quiet office.",
          ],
          cue: "Breath-led waves through the mid-back.",
        },
        {
          id: "snack-thoracic-reach",
          label: "Thread / open-arm reach",
          meta: "25s/side",
          image: "exercises/seated-twist.png",
          steps: [
            "Seated: reach one arm across or open it to the side while rotating the chest.",
            "Optional standing: hand on desk, soft hinge, open the free arm to the ceiling.",
            "Hold ~25s; switch.",
            "Stop if the shoulder pinches.",
          ],
          cue: "Open the chest toward the sky, soft neck.",
        },
        {
          id: "snack-scap-squeeze",
          label: "Scap squeezes",
          meta: "8–10 reps",
          image: "exercises/wall-angels.png",
          steps: [
            "Sit or stand tall; squeeze shoulder blades gently together.",
            "Hold 2s; release; repeat 8–10 times.",
            "Keep shoulders down away from ears.",
          ],
          cue: "Think ‘slide pockets together’ — not shrug.",
        },
      ],
    },
    {
      id: "full-reset",
      name: "Quick full reset",
      durationLabel: "~4 min",
      blurb: "Mix of the greatest hits",
      drills: [
        {
          id: "snack-reset-neck",
          label: "Neck & shoulder roll",
          meta: "40s",
          image: "exercises/seated-neck.png",
          steps: [
            "Shoulder rolls 20s, then a gentle ear-to-shoulder each side (~10s).",
            "No pulling, no cracking.",
          ],
          cue: "Start by unclenching the desk shrug.",
        },
        {
          id: "snack-reset-chest",
          label: "Doorway or clasp chest open",
          meta: "40s",
          image: "exercises/doorway-chest.png",
          steps: [
            "Doorway pec stretch or hands-behind-back clasp — pick one.",
            "Breathe into the chest ~40s total.",
          ],
          cue: "Open the front so the back can relax.",
        },
        {
          id: "snack-reset-twist",
          label: "Chair twist",
          meta: "20s/side",
          image: "exercises/chair-twist.png",
          steps: [
            "Seated twist each side ~20s.",
            "Length on the inhale; easy rotate on the exhale.",
          ],
          cue: "Mid-back only — neck stays soft.",
        },
        {
          id: "snack-reset-hips",
          label: "Figure-4 or standing hip",
          meta: "25s/side",
          image: "exercises/seated-figure4.png",
          steps: [
            "Seated figure-4 each side, or standing hip-flexor if you prefer.",
            "~25s/side is enough for a snack.",
          ],
          cue: "Hips like short and often more than deep and rare.",
        },
        {
          id: "snack-reset-wrist-calf",
          label: "Wrists + optional calf",
          meta: "45s",
          image: "exercises/desk-calf.png",
          steps: [
            "Quick wrist flex/extend on the desk (~30s).",
            "Optional: standing calf stretch at a wall (~15s/side) — or skip if space is tight.",
            "Shake hands out and return to work.",
          ],
          cue: "Close the loop: hands soft, legs awake.",
        },
      ],
    },
  ];

  const YOGA_STAGES = [
    {
      id: "yoga-soft",
      name: "Soft start",
      durationLabel: "~10–12 min",
      unlockGoal: "Finish 3 calm soft-start flows with no sharp pain",
      tips: "Breath first. Soft joints. Pain = ease off — this is mobility, not advanced yoga.",
      drills: [
        {
          id: "yoga-breath",
          label: "Seated breath",
          meta: "2 min · easy",
          image: "exercises/seated-breath.png",
          steps: [
            "Sit comfortably (cross-legged or on a chair).",
            "Relax the jaw and shoulders; lengthen the spine gently.",
            "Inhale through the nose for a slow count of 4.",
            "Exhale for a slow count of 4–6; repeat for ~2 minutes.",
            "If the mind wanders, return to the breath — no forcing.",
          ],
          cue: "Calm breath sets the tone — nothing to force yet.",
        },
        {
          id: "yoga-wrist",
          label: "Gentle wrist rocks",
          meta: "60s",
          image: "exercises/wrist-rocks.png",
          steps: [
            "Palms on the floor or thighs; rock softly forward and back.",
            "Add slow wrist circles both ways.",
            "Keep pressure light — wrists stay happy for later handstand days.",
            "Stop if anything feels sharp.",
          ],
          cue: "Warm wrists gently — they share the load with handstands.",
        },
        {
          id: "yoga-cat-cow",
          label: "Cat-cow",
          meta: "90s",
          image: "exercises/cat-cow.png",
          steps: [
            "On all fours, inhale to drop the belly and lift the gaze (cow).",
            "Exhale to round the spine and tuck the chin (cat).",
            "Match movement to breath for ~90 seconds.",
            "Move slowly — warm oil, not bouncing.",
          ],
          cue: "Wake the spine with breath-led motion.",
        },
        {
          id: "yoga-child",
          label: "Child's pose",
          meta: "60–90s",
          image: "exercises/childs-pose.png",
          steps: [
            "Kneel, sit hips toward heels, fold torso forward.",
            "Arms reach forward or rest by your sides — whichever feels softer.",
            "Forehead toward the floor or a cushion.",
            "Breathe into the back ribs; ease out slowly.",
          ],
          cue: "Rest pose — sink and breathe, never push the knees.",
        },
        {
          id: "yoga-butterfly-soft",
          label: "Butterfly (easy)",
          meta: "60s",
          image: "exercises/butterfly.png",
          steps: [
            "Sit tall; bring soles of the feet together.",
            "Let knees fall open only as far as comfortable.",
            "Hold feet or shins; optional tiny forward hinge.",
            "Soft knees and hips — no pressing the thighs down.",
          ],
          cue: "Hips open like a book — gravity does the work.",
        },
        {
          id: "yoga-twist-soft",
          label: "Seated twist (gentle)",
          meta: "30s/side",
          image: "exercises/seated-twist.png",
          steps: [
            "Sit tall; cross one ankle over the other thigh or keep legs easy.",
            "Inhale length; exhale rotate gently toward the top knee.",
            "Use the hand lightly on the knee — no yanking.",
            "Switch sides after ~30s.",
          ],
          cue: "Twist from the belly, not the neck — soft and short.",
        },
      ],
    },
    {
      id: "yoga-hips",
      name: "Hips openers",
      durationLabel: "~12–15 min",
      unlockGoal: "Hold butterfly or a pigeon variation ~60s/side without forcing",
      tips: "Hips like patience. Use props (blocks, pillows). Sharp groin pain = back off.",
      drills: [
        {
          id: "yoga-hips-breath",
          label: "Breath + easy fold",
          meta: "90s",
          image: "exercises/seated-breath.png",
          steps: [
            "Sit or stand; take 5 slow breaths.",
            "Optional: soft forward fold with bent knees to wake the hips.",
            "Arrive before you stretch.",
          ],
          cue: "Arrive in the body before you ask for range.",
        },
        {
          id: "yoga-butterfly",
          label: "Butterfly",
          meta: "90s",
          image: "exercises/butterfly.png",
          steps: [
            "Soles together; sit on a cushion if the low back rounds.",
            "Let knees drop with gravity; hands on feet or floor behind you.",
            "Optional: fold forward a little while keeping the spine long.",
            "Breathe into the inner thighs; ease out.",
          ],
          cue: "Long spine first — depth comes second.",
        },
        {
          id: "yoga-pigeon",
          label: "Pigeon (or figure-four)",
          meta: "45–60s/side",
          image: "exercises/pigeon.png",
          steps: [
            "From all fours, bring one shin forward (knee near wrist if available).",
            "Square the hips as best you can; pad the front hip if needed.",
            "Keep the back leg long; fold forward only if comfortable.",
            "Figure-four on your back is a perfect substitute.",
            "Switch sides; never force the front knee.",
          ],
          cue: "Prop the hip — intensity should feel stretchy, not pinchy.",
        },
        {
          id: "yoga-warrior-soft",
          label: "Warrior II (short)",
          meta: "30s/side",
          image: "exercises/warrior-ii.png",
          steps: [
            "Wide stance; front knee tracks over the ankle.",
            "Arms reach to the sides at shoulder height.",
            "Hips and chest face the long edge of your mat.",
            "Keep it short — this is hip opening, not a lunge contest.",
          ],
          cue: "Front knee friendly, back leg strong — breathe sideways.",
        },
        {
          id: "yoga-hips-child",
          label: "Child's pose reset",
          meta: "60s",
          image: "exercises/childs-pose.png",
          steps: [
            "Fold into child's pose; widen the knees if hips feel tight.",
            "Rock gently side to side if that feels good.",
            "Use this as a reset between stronger hip work.",
          ],
          cue: "Reset and thank the hips.",
        },
        {
          id: "yoga-hips-twist",
          label: "Seated twist",
          meta: "30s/side",
          image: "exercises/seated-twist.png",
          steps: [
            "Sit tall after hip work; gentle twist each side.",
            "Exhale into the rotation; keep both sit bones heavy.",
            "Release slowly.",
          ],
          cue: "Close the hip session with an easy twist.",
        },
      ],
    },
    {
      id: "yoga-hamstrings",
      name: "Hamstrings / forward folds",
      durationLabel: "~12–15 min",
      unlockGoal: "Comfortable forward fold with soft knees for ~60s",
      tips: "Bend the knees freely. Stretch sensation is OK; pain behind the knee is not.",
      drills: [
        {
          id: "yoga-ham-warm",
          label: "Cat-cow warm-up",
          meta: "60s",
          image: "exercises/cat-cow.png",
          steps: [
            "Flow cat-cow for a minute to wake the spine and hips.",
            "Then shift toward a gentle downward dog or pike.",
          ],
          cue: "Warm the chain before you fold.",
        },
        {
          id: "yoga-down-dog",
          label: "Downward dog (soft knees)",
          meta: "45–60s",
          image: "exercises/downward-dog.png",
          steps: [
            "Hands and feet on the floor; lift hips into an inverted V.",
            "Bend the knees as much as you need — heels don't have to touch.",
            "Press the floor away; long spine over straight legs.",
            "Pedal the feet gently; come down if shoulders fatigue.",
          ],
          cue: "Soft knees welcome — length in the spine beats flat legs.",
        },
        {
          id: "yoga-forward-fold",
          label: "Standing forward fold",
          meta: "60s",
          image: "exercises/forward-fold.png",
          steps: [
            "Hinge at the hips; let the head hang.",
            "Hold elbows or reach toward the floor with bent knees.",
            "Shift weight slightly forward into the balls of the feet.",
            "Slowly roll up vertebra by vertebra.",
          ],
          cue: "Hang and breathe — gravity stretches, you don't yank.",
        },
        {
          id: "yoga-seated-fold",
          label: "Seated forward fold / pike",
          meta: "60–90s",
          image: "exercises/forward-fold.png",
          steps: [
            "Sit with legs extended; bend knees generously if hamstrings are tight.",
            "Hinge from the hips with a long spine; hold shins or feet.",
            "When the spine rounds a lot, bend the knees more.",
            "Stay ~60–90s; roll up slowly.",
          ],
          cue: "Reach chest toward toes — not forehead at any cost.",
        },
        {
          id: "yoga-ham-butterfly",
          label: "Butterfly cool-out",
          meta: "60s",
          image: "exercises/butterfly.png",
          steps: [
            "Soles together after folds to change the stretch angle.",
            "Optional tiny fold; keep it easy.",
          ],
          cue: "Change the angle so hamstrings can let go.",
        },
        {
          id: "yoga-ham-child",
          label: "Child's pose",
          meta: "60s",
          image: "exercises/childs-pose.png",
          steps: [
            "Finish folded and quiet in child's pose.",
            "Notice the breath in the back body.",
          ],
          cue: "End soft — folds shouldn't leave you strained.",
        },
      ],
    },
    {
      id: "yoga-shoulders",
      name: "Shoulders & upper back",
      durationLabel: "~12–15 min",
      unlockGoal: "Puppy / thread or wall angels feel open without pinching",
      tips: "Ribs soft. Neck long. Complements handstand shoulder work — don't overdo same-day intensity.",
      drills: [
        {
          id: "yoga-sh-wrist",
          label: "Wrist + shoulder warm",
          meta: "90s",
          image: "exercises/wrist-rocks.png",
          steps: [
            "Wrist rocks and circles (~45s).",
            "Shake the hands out; shrug and roll the shoulders.",
          ],
          cue: "Warm the wrists before you load or open the shoulders.",
        },
        {
          id: "yoga-sh-opener",
          label: "Puppy / thread-the-needle",
          meta: "60s/side or ~2 min",
          image: "exercises/shoulder-opener.png",
          steps: [
            "Puppy: from all fours, walk hands forward and lower the chest.",
            "Keep hips over knees; breathe into the armpits.",
            "Thread-the-needle: slide one arm under; hold, then switch.",
            "No forcing the forehead to the floor.",
          ],
          cue: "Open the upper back without dumping into the neck.",
        },
        {
          id: "yoga-sh-cat",
          label: "Cat-cow (thoracic focus)",
          meta: "60–90s",
          image: "exercises/cat-cow.png",
          steps: [
            "Emphasize the mid-back wave more than the low back.",
            "Slow reps with full exhales on the round.",
          ],
          cue: "Mobilise the mid-back — handstands love this.",
        },
        {
          id: "yoga-sh-angels",
          label: "Wall angels",
          meta: "8–10 reps",
          image: "exercises/wall-angels.png",
          steps: [
            "Back near a wall; arms in a cactus/W shape.",
            "Slide toward a Y and back down without flaring the ribs.",
            "Smaller range is fine if shoulders are sticky.",
          ],
          cue: "Quiet ribs, smooth scap motion.",
        },
        {
          id: "yoga-cobra",
          label: "Cobra (gentle)",
          meta: "3 × 20–30s",
          image: "exercises/cobra.png",
          steps: [
            "Lie on your belly; hands under shoulders.",
            "Press lightly to lift the chest; keep elbows soft and pelvis heavy.",
            "Look forward or slightly down — don't crank the neck.",
            "Lower with control; repeat for 3 easy holds.",
          ],
          cue: "Lift the heart, heavy hips — tiny backbend is enough.",
        },
        {
          id: "yoga-sh-child",
          label: "Child's pose",
          meta: "60s",
          image: "exercises/childs-pose.png",
          steps: [
            "Fold forward to release the spine after backbends.",
            "Reach arms forward for a soft shoulder stretch, or stack arms under the forehead.",
          ],
          cue: "Counter the backbend with a soft fold.",
        },
      ],
    },
    {
      id: "yoga-flow-a",
      name: "Full-body flow A",
      durationLabel: "~15–18 min",
      unlockGoal: "Move through Flow A twice with steady breath",
      tips: "Link poses with breath. Skip or shorten anything that irritates wrists or hips.",
      drills: [
        {
          id: "yoga-fa-cat",
          label: "Cat-cow → down dog",
          meta: "2 min",
          image: "exercises/downward-dog.png",
          steps: [
            "Start with 5 cat-cows.",
            "Tuck toes, lift hips into downward dog; pedal the feet.",
            "Soft knees; hold ~3 breaths.",
          ],
          cue: "Warm, then invert gently — breath leads.",
        },
        {
          id: "yoga-fa-warrior",
          label: "Warrior II each side",
          meta: "30–40s/side",
          image: "exercises/warrior-ii.png",
          steps: [
            "Step to a wide stance from down dog or standing.",
            "Warrior II on the right; breathe; then left.",
            "Front knee tracks; arms soft at shoulder height.",
          ],
          cue: "Strong legs, soft face — gaze over the front hand.",
        },
        {
          id: "yoga-fa-fold",
          label: "Forward fold",
          meta: "45s",
          image: "exercises/forward-fold.png",
          steps: [
            "From standing, fold with bent knees.",
            "Hold elbows; sway gently if it feels good.",
          ],
          cue: "Hang between standing poses.",
        },
        {
          id: "yoga-fa-cobra",
          label: "Cobra",
          meta: "2 × 20s",
          image: "exercises/cobra.png",
          steps: [
            "Lower to the belly; two gentle cobras with breath.",
            "Keep it low and comfortable.",
          ],
          cue: "Open the front body without forcing the backbend.",
        },
        {
          id: "yoga-fa-pigeon",
          label: "Pigeon each side",
          meta: "45s/side",
          image: "exercises/pigeon.png",
          steps: [
            "Pigeon or figure-four each side.",
            "Use padding; stay only where breath is easy.",
          ],
          cue: "Hip openers inside the flow — quality over depth.",
        },
        {
          id: "yoga-fa-child",
          label: "Child's pose close",
          meta: "90s",
          image: "exercises/childs-pose.png",
          steps: [
            "Finish in child's pose; count 10 slow breaths.",
            "Optional seated breath for another minute.",
          ],
          cue: "Land the flow — nervous system first.",
        },
      ],
    },
    {
      id: "yoga-flow-b",
      name: "Full-body flow B",
      durationLabel: "~15–20 min",
      unlockGoal: "Hold key poses 45–60s with calm breathing",
      tips: "Longer holds, same kindness. You're building flexibility to support handstands — not forcing splits.",
      drills: [
        {
          id: "yoga-fb-breath",
          label: "Seated breath",
          meta: "2 min",
          image: "exercises/seated-breath.png",
          steps: [
            "Arrive with 2 minutes of steady nasal breathing.",
            "Set an intention: soft strength.",
          ],
          cue: "Longer practice starts quieter.",
        },
        {
          id: "yoga-fb-dog",
          label: "Downward dog (longer)",
          meta: "60–75s",
          image: "exercises/downward-dog.png",
          steps: [
            "Hold down dog with soft knees; pedal occasionally.",
            "If shoulders tire, drop to child's pose and return.",
          ],
          cue: "Earn the hold with soft knees and active hands.",
        },
        {
          id: "yoga-fb-warrior",
          label: "Warrior II (longer)",
          meta: "45s/side",
          image: "exercises/warrior-ii.png",
          steps: [
            "Warrior II each side for ~45s.",
            "Check front knee tracking; soften the shoulders away from the ears.",
          ],
          cue: "Stay tall in the torso while the legs work.",
        },
        {
          id: "yoga-fb-pigeon",
          label: "Pigeon (longer)",
          meta: "60s/side",
          image: "exercises/pigeon.png",
          steps: [
            "One minute per side; prop generously.",
            "Fold only if the hip stays level and calm.",
          ],
          cue: "Longer ≠ deeper — same depth, more breath.",
        },
        {
          id: "yoga-fb-twist",
          label: "Seated twist",
          meta: "40s/side",
          image: "exercises/seated-twist.png",
          steps: [
            "Seated twist each side after hips.",
            "Inhale length; exhale rotate.",
          ],
          cue: "Wring out gently after the holds.",
        },
        {
          id: "yoga-fb-butterfly",
          label: "Butterfly hold",
          meta: "90s",
          image: "exercises/butterfly.png",
          steps: [
            "Soles together; long easy hold.",
            "Optional forehead toward feet with a rounded or long spine — choose comfort.",
          ],
          cue: "Let gravity finish the session.",
        },
        {
          id: "yoga-fb-child",
          label: "Child's pose + breath",
          meta: "2 min",
          image: "exercises/childs-pose.png",
          steps: [
            "Child's pose, then sit for a final minute of breath.",
            "Notice wrists, hips, and mood before you leave the mat.",
          ],
          cue: "Close with stillness — mobility work sticks better this way.",
        },
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
    miniStreak: 0,
    lastMiniDate: null,
    yogaStreak: 0,
    lastYogaDate: null,
    yogaUnlockedStage: 0,
    yogaCompletedStages: [],
    officeSnackCountToday: 0,
    lastOfficeSnackDate: null,
    officeSnackStreak: 0,
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

  let selectedSnackPackId = null;



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

  function yogaDoneToday() {
    return state.lastYogaDate === todayISO();
  }

  function currentYogaStageIndex() {
    return Math.min(state.yogaUnlockedStage || 0, YOGA_STAGES.length - 1);
  }

  function nextYogaStageIndex() {
    const cur = state.yogaUnlockedStage || 0;
    return cur < YOGA_STAGES.length - 1 ? cur + 1 : null;
  }

  function applyYogaStreak(yogaDate) {
    let bonus = 0;
    let messages = [];
    let incremented = false;
    if (!state.lastYogaDate) {
      state.yogaStreak = 1;
      incremented = true;
    } else {
      const gap = daysBetween(state.lastYogaDate, yogaDate);
      if (gap === 0) {
        // same day — streak unchanged
      } else if (gap === 1) {
        state.yogaStreak += 1;
        incremented = true;
      } else if (gap > 1) {
        state.yogaStreak = 1;
        incremented = true;
        messages.push("Yoga streak reset");
      }
    }
    if (incremented && state.yogaStreak > 0 && state.yogaStreak % STREAK_BONUS_EVERY === 0) {
      bonus = STREAK_BONUS_XP;
      messages.push(`Yoga streak ×${state.yogaStreak}! +${STREAK_BONUS_XP} XP`);
    }
    state.lastYogaDate = yogaDate;
    return { bonus, messages };
  }


  function officeSnacksLoggedToday() {
    if (state.lastOfficeSnackDate !== todayISO()) return 0;
    return state.officeSnackCountToday || 0;
  }

  function officeSnacksRemainingToday() {
    return Math.max(0, OFFICE_SNACK_MAX_PER_DAY - officeSnacksLoggedToday());
  }

  function applyOfficeSnackStreak(snackDate) {
    let messages = [];
    if (!state.lastOfficeSnackDate) {
      state.officeSnackStreak = 1;
    } else {
      const gap = daysBetween(state.lastOfficeSnackDate, snackDate);
      if (gap === 0) {
        // same day — streak unchanged
      } else if (gap === 1) {
        state.officeSnackStreak = (state.officeSnackStreak || 0) + 1;
      } else if (gap > 1) {
        state.officeSnackStreak = 1;
        messages.push("Office snack streak reset");
      }
    }
    return { messages };
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
    renderSnacks();
    renderYoga();
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
      else if (last.type === "office-snack") typeBit = "Office snack";
      else if (last.type === "yoga") typeBit = "Yoga flow";
      else if (last.type === "yoga-unlock") typeBit = "Yoga unlock";
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


    const snackStatus = document.getElementById("snack-status-text");
    const snackBadge = document.getElementById("snack-streak-badge");
    const snackBtn = document.getElementById("btn-goto-snacks");
    const snackCard = document.getElementById("snack-status-card");
    if (snackStatus && snackBadge) {
      const count = officeSnacksLoggedToday();
      const streak = state.officeSnackStreak || 0;
      snackBadge.textContent = `🍪 ${streak}`;
      const base = `Office snacks today: ${count}/${OFFICE_SNACK_MAX_PER_DAY}`;
      if (count >= OFFICE_SNACK_MAX_PER_DAY) {
        snackStatus.textContent = streak
          ? `${base} · snack streak ${streak}`
          : `${base} · nice work`;
        snackStatus.classList.remove("muted");
        if (snackCard) snackCard.classList.add("snack-done");
        if (snackBtn) snackBtn.textContent = "View Snacks";
      } else {
        snackStatus.textContent = streak
          ? `${base} · snack streak ${streak} · try one between meetings`
          : `${base} · try one between meetings`;
        snackStatus.classList.add("muted");
        if (snackCard) snackCard.classList.remove("snack-done");
        if (snackBtn) snackBtn.textContent = "Open Snacks";
      }
    }

    const yogaStageEl = document.getElementById("yoga-stage-name");
    const yogaStatus = document.getElementById("yoga-status-text");
    const yogaBadge = document.getElementById("yoga-streak-badge");
    const yogaBtn = document.getElementById("btn-goto-yoga");
    const yogaCard = document.getElementById("yoga-status-card");
    if (yogaStageEl && yogaStatus && yogaBadge) {
      const yStage = YOGA_STAGES[currentYogaStageIndex()];
      const yDone = yogaDoneToday();
      const yStreak = state.yogaStreak || 0;
      yogaStageEl.textContent = yStage.name;
      yogaBadge.textContent = `🧘 ${yStreak}`;
      if (yDone) {
        yogaStatus.textContent = `Done today · yoga streak ${yStreak}`;
        yogaStatus.classList.remove("muted");
        if (yogaCard) yogaCard.classList.add("yoga-done");
        if (yogaBtn) yogaBtn.textContent = "View Yoga";
      } else {
        yogaStatus.textContent = yStreak
          ? `Not done today · yoga streak ${yStreak} · ${yStage.durationLabel}`
          : `Not done today · ${yStage.durationLabel} mobility`;
        yogaStatus.classList.add("muted");
        if (yogaCard) yogaCard.classList.remove("yoga-done");
        if (yogaBtn) yogaBtn.textContent = "Open Yoga";
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


  function getSnackPack(id) {
    return OFFICE_SNACKS.find((p) => p.id === id) || null;
  }

  function renderSnacks() {
    const count = officeSnacksLoggedToday();
    const remaining = officeSnacksRemainingToday();
    const streak = state.officeSnackStreak || 0;

    const countLine = document.getElementById("snack-count-line");
    if (countLine) {
      countLine.textContent = remaining
        ? `Today: ${count}/${OFFICE_SNACK_MAX_PER_DAY} snacks · +${OFFICE_SNACK_XP} XP each · snack streak ${streak}`
        : `Today: ${count}/${OFFICE_SNACK_MAX_PER_DAY} · max XP for today · snack streak ${streak}`;
    }

    const banner = document.getElementById("snack-done-banner");
    if (banner) {
      banner.hidden = remaining > 0;
      if (!remaining) {
        banner.textContent = `Today's snacks: ${OFFICE_SNACK_MAX_PER_DAY}/${OFFICE_SNACK_MAX_PER_DAY} · +${OFFICE_SNACK_XP * OFFICE_SNACK_MAX_PER_DAY} XP max reached`;
      }
    }

    const grid = document.getElementById("snack-pack-grid");
    if (grid) {
      grid.innerHTML = OFFICE_SNACKS.map((p) => {
        const selected = selectedSnackPackId === p.id ? " selected" : "";
        return `<button type="button" class="snack-pack-card${selected}" data-snack-id="${escapeHtml(p.id)}" role="option" aria-selected="${selected ? "true" : "false"}">
          <strong>${escapeHtml(p.name)}</strong>
          <span class="snack-pack-meta">${escapeHtml(p.durationLabel)}</span>
          <span class="snack-pack-blurb">${escapeHtml(p.blurb)}</span>
        </button>`;
      }).join("");
    }

    const detail = document.getElementById("snack-detail-card");
    const pack = selectedSnackPackId ? getSnackPack(selectedSnackPackId) : null;
    if (detail) {
      if (!pack) {
        detail.hidden = true;
      } else {
        detail.hidden = false;
        const title = document.getElementById("snack-pack-title");
        const meta = document.getElementById("snack-pack-meta");
        if (title) title.textContent = pack.name;
        if (meta) meta.textContent = `${pack.durationLabel} · ${pack.drills.length} moves · desk-friendly`;

        const list = document.getElementById("snack-drills");
        if (list) {
          list.innerHTML = pack.drills
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
        }

        const btn = document.getElementById("btn-log-snack");
        if (btn) {
          btn.disabled = remaining <= 0;
          btn.textContent = remaining <= 0
            ? "Daily snack limit reached"
            : `Log this snack (+${OFFICE_SNACK_XP} XP)`;
        }
      }
    }
  }

  function renderYoga() {
    const idx = currentYogaStageIndex();
    const stage = YOGA_STAGES[idx];
    const label = document.getElementById("yoga-stage-label");
    if (label) {
      label.textContent = `Stage ${idx + 1} of ${YOGA_STAGES.length} · ${stage.durationLabel}`;
    }
    const title = document.getElementById("yoga-stage-title");
    if (title) title.textContent = stage.name;

    const list = document.getElementById("yoga-drills");
    if (list) {
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
    }

    const done = yogaDoneToday();
    const banner = document.getElementById("yoga-done-banner");
    const btn = document.getElementById("btn-log-yoga");
    if (banner) {
      banner.hidden = !done;
      if (done) {
        banner.textContent = `Done today · +12 XP · yoga streak ${state.yogaStreak || 0}`;
      }
    }
    if (btn) {
      btn.disabled = done;
      btn.textContent = done ? "Already logged today" : "Log Yoga flow (+12 XP)";
    }

    const map = document.getElementById("yoga-stage-map");
    if (map) {
      const cur = currentYogaStageIndex();
      map.innerHTML = YOGA_STAGES.map((s, i) => {
        let status = "locked";
        let icon = "🔒";
        let statusText = "Locked";
        if ((state.yogaCompletedStages || []).includes(i) || i < cur) {
          status = "done";
          icon = "✓";
          statusText = "Done";
        }
        if (i === cur) {
          if ((state.yogaCompletedStages || []).includes(i)) {
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
            <h3>${i + 1}. ${escapeHtml(s.name)}</h3>
            <p>${escapeHtml(s.durationLabel)} · Unlock: ${escapeHtml(s.unlockGoal)}</p>
            <span class="stage-status">${statusText}</span>
          </div>
        </li>`;
      }).join("");
    }

    const unlockCriteria = document.getElementById("yoga-unlock-criteria");
    const unlockBtn = document.getElementById("btn-yoga-unlock");
    if (unlockCriteria && unlockBtn) {
      const next = nextYogaStageIndex();
      if (next === null) {
        const finished = (state.yogaCompletedStages || []).includes(idx);
        unlockCriteria.textContent = finished
          ? "You've completed every yoga stage. Keep flowing for streak + mobility XP."
          : `Final goal: ${stage.unlockGoal}. Self-report when ready (+20 XP).`;
        unlockBtn.disabled = finished;
        unlockBtn.textContent = finished ? "All yoga stages complete" : "I hit the goal — mark complete (+20 XP)";
      } else {
        const nextStage = YOGA_STAGES[next];
        unlockCriteria.textContent =
          `To unlock “${nextStage.name}”: ${stage.unlockGoal}. Self-report when ready (+20 XP).`;
        unlockBtn.disabled = false;
        unlockBtn.textContent = "I hit the goal — unlock next (+20 XP)";
      }
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
              : s.type === "office-snack"
                ? "Office snack"
                : s.type === "yoga"
                  ? "Yoga"
                  : s.type === "yoga-unlock"
                    ? "Yoga unlock"
                    : s.type === "boss"
                      ? "Boss fight"
                      : s.type === "unlock"
                        ? "Unlock attempt"
                        : "Training";
        const meta = [];
        if (s.stageName) meta.push(s.stageName);
        if (s.type === "mini") meta.push(DAILY_MINI.durationLabel + " stretch");
        if (s.type === "office-snack" && s.durationLabel) meta.push(s.durationLabel);
        if (s.type === "yoga" && s.durationLabel) meta.push(s.durationLabel);
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


  function logOfficeSnack(packId) {
    const date = todayISO();
    const pack = getSnackPack(packId);
    if (!pack) {
      toast("Pick a snack pack first");
      showView("snacks");
      return;
    }
    const already = officeSnacksLoggedToday();
    if (already >= OFFICE_SNACK_MAX_PER_DAY) {
      toast("Already logged 3 office snacks today — come back tomorrow");
      showView("snacks");
      return;
    }
    const prevLevel = levelFromXp(state.xp);
    const xp = OFFICE_SNACK_XP;
    const msgs = [];
    const isFirstToday = state.lastOfficeSnackDate !== date;
    if (isFirstToday) {
      const { messages } = applyOfficeSnackStreak(date);
      state.officeSnackCountToday = 1;
      state.lastOfficeSnackDate = date;
      if (messages.length) msgs.push(...messages);
    } else {
      state.officeSnackCountToday = already + 1;
      state.lastOfficeSnackDate = date;
    }
    // Does NOT call applyStreak / mini / yoga streaks
    const leveled = addXp(xp);
    const count = state.officeSnackCountToday;
    msgs.unshift(
      `Office snack logged! +${xp} XP`,
      `${pack.name}`,
      `${count}/${OFFICE_SNACK_MAX_PER_DAY} today`,
      `Snack streak ${state.officeSnackStreak || 0}`
    );
    pushSession({
      id: Date.now(),
      type: "office-snack",
      date,
      stageName: pack.name,
      durationLabel: pack.durationLabel,
      notes: "Desk stretch snack · pain = stop",
      drills: pack.drills.map((d) => d.id),
      xpEarned: xp,
      snackPackId: pack.id,
    });
    saveState(state);
    renderAll();
    toast(msgs.join(" · "));
    if (leveled || levelFromXp(state.xp) > prevLevel) celebrateLevelUp();
    showView("home");
  }

  function logYogaFlow() {
    const date = todayISO();
    if (state.lastYogaDate === date) {
      toast("Yoga already logged today — come back tomorrow");
      showView("yoga");
      return;
    }
    const prevLevel = levelFromXp(state.xp);
    const stage = YOGA_STAGES[currentYogaStageIndex()];
    let xp = 12;
    const { bonus, messages } = applyYogaStreak(date);
    const msgs = [`Yoga flow done! +${xp} XP`, `Yoga streak ${state.yogaStreak}`];
    if (bonus) {
      xp += bonus;
      msgs.push(...messages);
    } else if (messages.length) {
      msgs.push(...messages);
    }
    // Does NOT call applyStreak — handstand main streak unchanged
    const leveled = addXp(xp);
    pushSession({
      id: Date.now(),
      type: "yoga",
      date,
      stageIndex: currentYogaStageIndex(),
      stageName: stage.name,
      durationLabel: stage.durationLabel,
      notes: "Gentle mobility · pain = ease off",
      drills: stage.drills.map((d) => d.id),
      xpEarned: xp,
    });
    saveState(state);
    renderAll();
    toast(msgs.join(" · "));
    if (leveled || levelFromXp(state.xp) > prevLevel) celebrateLevelUp();
    showView("home");
  }

  function attemptYogaUnlock() {
    const idx = currentYogaStageIndex();
    const stage = YOGA_STAGES[idx];
    const next = nextYogaStageIndex();
    const date = todayISO();
    const prevLevel = levelFromXp(state.xp);

    if (next === null) {
      if ((state.yogaCompletedStages || []).includes(idx)) {
        toast("All yoga stages already complete");
        return;
      }
      const confirmed = window.confirm(
        `Mark final yoga stage complete?\n\n“${stage.unlockGoal}”\n\nOK = +20 XP and mark complete.`
      );
      if (!confirmed) return;
      const xp = 20;
      const leveled = addXp(xp);
      if (!state.yogaCompletedStages) state.yogaCompletedStages = [];
      if (!state.yogaCompletedStages.includes(idx)) state.yogaCompletedStages.push(idx);
      pushSession({
        id: Date.now(),
        type: "yoga-unlock",
        date,
        stageName: stage.name,
        notes: "Final yoga stage marked complete",
        xpEarned: xp,
        unlocked: true,
      });
      saveState(state);
      renderAll();
      toast("Yoga path complete! +20 XP");
      fireConfetti();
      if (leveled || levelFromXp(state.xp) > prevLevel) celebrateLevelUp();
      showView("yoga");
      return;
    }

    const nextStage = YOGA_STAGES[next];
    const confirmed = window.confirm(
      `Unlock next yoga stage?\n\nGoal: “${stage.unlockGoal}”\nNext: ${nextStage.name}\n\nOK = unlock (+20 XP).`
    );
    if (!confirmed) return;

    const xp = 20;
    const leveled = addXp(xp);
    if (!state.yogaCompletedStages) state.yogaCompletedStages = [];
    if (!state.yogaCompletedStages.includes(idx)) state.yogaCompletedStages.push(idx);
    state.yogaUnlockedStage = next;
    pushSession({
      id: Date.now(),
      type: "yoga-unlock",
      date,
      stageName: nextStage.name,
      notes: `Unlocked yoga: ${nextStage.name}`,
      xpEarned: xp,
      unlocked: true,
    });
    saveState(state);
    renderAll();
    toast(`Yoga stage unlocked! +20 XP · ${nextStage.name}`);
    fireConfetti();
    if (leveled || levelFromXp(state.xp) > prevLevel) celebrateLevelUp();
    showView("yoga");
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
  bindDrillListToggle(document.getElementById("yoga-drills"));
  bindDrillListToggle(document.getElementById("snack-drills"));


  const snackGrid = document.getElementById("snack-pack-grid");
  if (snackGrid) {
    snackGrid.addEventListener("click", (e) => {
      const btn = e.target.closest("[data-snack-id]");
      if (!btn) return;
      selectedSnackPackId = btn.getAttribute("data-snack-id");
      renderSnacks();
      const detail = document.getElementById("snack-detail-card");
      if (detail) detail.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  }

  const btnLogSnack = document.getElementById("btn-log-snack");
  if (btnLogSnack) {
    btnLogSnack.addEventListener("click", () => {
      if (!selectedSnackPackId) {
        toast("Pick a snack pack first");
        return;
      }
      if (officeSnacksRemainingToday() <= 0) {
        toast("Daily snack limit reached (3/3)");
        return;
      }
      const pack = getSnackPack(selectedSnackPackId);
      const name = pack ? pack.name : "snack";
      if (window.confirm(`Log "${name}" office snack? (+${OFFICE_SNACK_XP} XP · up to ${OFFICE_SNACK_MAX_PER_DAY}/day · does not change other streaks)`)) {
        logOfficeSnack(selectedSnackPackId);
      }
    });
  }

  const btnSnackBack = document.getElementById("btn-snack-back");
  if (btnSnackBack) {
    btnSnackBack.addEventListener("click", () => {
      selectedSnackPackId = null;
      renderSnacks();
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }

  const btnLogYoga = document.getElementById("btn-log-yoga");
  if (btnLogYoga) {
    btnLogYoga.addEventListener("click", () => {
      if (yogaDoneToday()) {
        toast("Yoga already logged today");
        return;
      }
      if (window.confirm("Log today's Yoga flow? (+12 XP · own streak · does not change handstand streak)")) {
        logYogaFlow();
      }
    });
  }

  const btnYogaUnlock = document.getElementById("btn-yoga-unlock");
  if (btnYogaUnlock) {
    btnYogaUnlock.addEventListener("click", () => {
      attemptYogaUnlock();
    });
  }

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
