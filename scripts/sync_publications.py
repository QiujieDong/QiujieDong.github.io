from __future__ import annotations

import pathlib
import re
import sys


ROOT = pathlib.Path(__file__).resolve().parents[1]
INDEX_PATH = ROOT / "index.html"

PLACEHOLDERS = {
    "publications": '<div id="publications-section-root"></div>',
    "property": '<div id="property-section-root"></div>',
}

SYNC_SOURCES = [
    ("news_index.html", ("news",)),
    ("publications_index.html", ("publications", "property")),
]


def extract_section(html: str, section_id: str, source_name: str) -> str:
    pattern = re.compile(rf'(<section id="{section_id}"(?=[\s>]).*?</section>)', re.DOTALL)
    match = pattern.search(html)
    if not match:
        raise ValueError(f'Unable to find <section id="{section_id}"> in {source_name}.')
    return match.group(1).strip()


def replace_generated_block(index_html: str, block_name: str, section_html: str) -> str:
    begin = f"<!-- GENERATED:{block_name.upper()}:BEGIN -->"
    end = f"<!-- GENERATED:{block_name.upper()}:END -->"
    replacement = f"{begin}\n{section_html}\n{end}"

    marker_pattern = re.compile(
        rf"{re.escape(begin)}.*?{re.escape(end)}",
        re.DOTALL,
    )
    if marker_pattern.search(index_html):
        return marker_pattern.sub(replacement, index_html, count=1)

    placeholder = PLACEHOLDERS[block_name]
    if placeholder not in index_html:
        raise ValueError(
            f'Unable to find placeholder "{placeholder}" or generated markers for {block_name} in {INDEX_PATH.name}.'
        )
    return index_html.replace(placeholder, replacement, 1)


def main() -> int:
    index_html = INDEX_PATH.read_text(encoding="utf-8")
    updated_html = index_html

    for source_name, section_ids in SYNC_SOURCES:
        source_html = (ROOT / source_name).read_text(encoding="utf-8")
        for section_id in section_ids:
            section_html = extract_section(source_html, section_id, source_name)
            updated_html = replace_generated_block(updated_html, section_id, section_html)

    if updated_html == index_html:
        print("index.html is already in sync.")
        return 0

    INDEX_PATH.write_text(updated_html, encoding="utf-8")
    print("Synchronized news_index.html and publications_index.html into index.html.")
    return 0


if __name__ == "__main__":
    try:
        raise SystemExit(main())
    except Exception as exc:
        print(f"Error: {exc}", file=sys.stderr)
        raise SystemExit(1)
    
    # python scripts/sync_publications.py

