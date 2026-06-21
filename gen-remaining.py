import subprocess, os, time, sys

PRODUCTS = {
  "tile-adhesive": "tile thinset mortar bag",
  "tile-grout": "sanded tile grout bag",
  "tile-leveling-clips": "tile leveling clips",
  "fiberglass-insulation": "fiberglass batt roll insulation",
  "foam-board-insulation": "foam board panel insulation",
  "fiber-cement-siding": "fiber cement siding plank",
  "underlayment-roll": "flooring underlayment roll",
  "joint-compound": "joint compound bucket",
  "liquid-waterproofing-membrane": "waterproofing membrane liquid",
  "steel-angle": "galvanized steel angle iron",
  "flat-bar": "hot-rolled steel flat bar",
  "square-steel-tube": "square steel tubing",
  "round-steel-pipe": "galvanized round pipe",
  "anchor-bolt": "hex anchor bolt galvanized",
  "concrete-screw": "masonry concrete screw",
  "hex-nut": "zinc hex nut",
  "flat-washer": "zinc flat washer",
  "wood-screw": "Phillips wood screw",
  "cutting-disc": "metal cutting grinding disc",
  "welding-rod": "E7018 welding electrode",
  "door-hinge": "brass door hinge",
  "door-closer": "commercial door closer",
  "deadbolt": "deadbolt lock",
  "door-lockset": "entry door lockset",
  "cabinet-pull": "stainless cabinet drawer pull",
  "drawer-slide": "drawer slide mechanism",
  "soft-close-hinge": "soft close cabinet hinge",
  "pull-out-basket": "chrome pull-out wire basket",
  "hammer": "claw hammer fiberglass",
  "pipe-wrench": "pipe wrench adjustable",
  "pliers-set": "pliers set",
  "screwdriver-set": "multi-bit screwdriver set",
  "drill-driver": "20V cordless drill",
}

ANGLE_PROMPTS = {
  1: "Professional product photography of {desc}, front view, white background, studio lighting",
  2: "{desc} side angle 45-degree, white background, product catalog",
  3: "Close-up detail {desc}, macro, sharp focus, white background",
  4: "{desc} installed in construction, realistic building",
  5: "{desc} packaging branding, retail display, white background",
}

CHUNK = int(sys.argv[1]) if len(sys.argv) > 1 else 0
CHUNK_SIZE = 40  # images per chunk

tasks = []
for ptype, desc in PRODUCTS.items():
  for angle in range(1, 6):
    outfile = f"public/images/products/{ptype}/angle-{angle}.png"
    if os.path.isfile(outfile) and os.path.getsize(outfile) > 5000:
      continue
    prompt = ANGLE_PROMPTS[angle].format(desc=desc)
    tasks.append((ptype, angle, outfile, prompt))

# Chunk the tasks
start = CHUNK * CHUNK_SIZE
end = start + CHUNK_SIZE
chunk_tasks = tasks[start:end]
print(f"Chunk {CHUNK}: tasks {start}-{end} of {len(tasks)} total, this chunk: {len(chunk_tasks)}")

ok = 0
fail = 0
procs = []

for i, (ptype, angle, outfile, prompt) in enumerate(chunk_tasks):
  if i > 0 and i % 2 == 0:
    # Every 2 tasks, wait for previous to finish + cooldown
    for p in procs:
      p.wait()
      if p.returncode == 0:
        ok += 1
      else:
        fail += 1
    procs = []
    time.sleep(2)
  
  p = subprocess.Popen(
    ["z-ai", "image", "-p", prompt, "-o", outfile],
    stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL
  )
  procs.append(p)

# Wait for remaining
for p in procs:
  p.wait()
  if p.returncode == 0:
    ok += 1
  else:
    fail += 1

print(f"Chunk {CHUNK} done: ok={ok}, fail={fail}")

# Count total
total = 0
for ptype in PRODUCTS:
  for angle in range(1, 6):
    f = f"public/images/products/{ptype}/angle-{angle}.png"
    if os.path.isfile(f) and os.path.getsize(f) > 5000:
      total += 1
print(f"Total images >5KB: {total}/{len(tasks)+sum(5 for t in tasks)}")
