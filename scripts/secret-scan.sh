#!/usr/bin/env bash
# Narrow, best-effort scan for common accidentally committed secret material.
#
# Scope and limitations (IMP-005):
# - Scans only git-tracked files (git ls-files); untracked/ignored files are
#   never committed and are out of scope.
# - Recognizes a small, fixed set of known provider token/key shapes and PEM
#   private-key block headers. It does NOT use entropy analysis and will miss
#   unrecognized secret formats, secrets split across lines, or secrets that
#   do not match a known provider pattern.
# - A clean result means "no known pattern matched" — it never proves that no
#   secret exists in the repository.
# - Placeholder/example values (e.g. blank .env.example entries) do not match
#   any pattern here because they contain no real key material.
set -euo pipefail

PATTERNS=(
  '-----BEGIN (RSA |EC |DSA |OPENSSH |PGP |ENCRYPTED )?PRIVATE KEY-----'
  'AKIA[0-9A-Z]{16}'
  'AIza[0-9A-Za-z_-]{35}'
  'sk_live_[0-9a-zA-Z]{10,}'
  'xox[baprs]-[0-9A-Za-z-]{10,}'
  'gh[pousr]_[A-Za-z0-9]{36,}'
)

found=0

while IFS= read -r file; do
  for pattern in "${PATTERNS[@]}"; do
    # -I skips binary files; -q suppresses match content so no potential
    # secret value is ever printed into CI logs.
    if grep -I -qE "$pattern" -- "$file" 2>/dev/null; then
      echo "Potential secret pattern matched in tracked file: $file"
      found=1
    fi
  done
done < <(git ls-files)

if [ "$found" -ne 0 ]; then
  echo "::error::Potential committed secret material detected. Review and remove before merging. This check does not print matched content; inspect the listed file(s) directly."
  exit 1
fi

echo "Secret scan: no known secret patterns detected in tracked files (best-effort check; does not prove no secrets exist)."
