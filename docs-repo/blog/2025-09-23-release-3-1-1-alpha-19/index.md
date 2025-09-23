---
# slug: welcome
title: Release 3.1.1-alpha.19 & 20
# authors: [slorber, yangshun]
tags: [news]
---

Changes:

- Fixed a bug when NUO-STEMS froze on 3% (crashed) on Windows when using NVIDIA GPU with < 4GB of VRAM, even if setting "GPU acceleration" to "disabled (force CPU only)".
- Fixed a bug on Windows where pressing "Stop Processing" button triggered an error (even though everything was working fine).
- Fixed a bug on Windows where if the Queue finished all tasks, it triggered an error (even though everything was working fine).
