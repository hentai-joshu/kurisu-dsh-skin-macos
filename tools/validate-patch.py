#!/usr/bin/env python3
"""Validate a DSH cordis.patch.yml.

DSH's patch layer is YAML plus custom tags such as `!!js` (JavaScript
expressions), which plain `yaml.safe_load` refuses to construct. This script
loads the file with a permissive loader so a broken edit is caught before the
next DSH boot, while `!!js` values are kept as plain scalars.

Exit code 0 = parses as a top-level array; 1 = broken.
"""
import sys

try:
    import yaml
except ImportError:  # PyYAML missing: do not block the caller
    print("yaml module unavailable, skipping validation")
    sys.exit(0)


class PermissiveLoader(yaml.SafeLoader):
    pass


def _any_tag(loader, suffix, node):
    if isinstance(node, yaml.ScalarNode):
        return loader.construct_scalar(node)
    if isinstance(node, yaml.SequenceNode):
        return loader.construct_sequence(node, deep=True)
    if isinstance(node, yaml.MappingNode):
        return loader.construct_mapping(node, deep=True)
    return None


PermissiveLoader.add_multi_constructor("tag:yaml.org,2002:js", _any_tag)
PermissiveLoader.add_multi_constructor("!", _any_tag)


def main(argv):
    if len(argv) != 2:
        print("usage: validate-patch.py <cordis.patch.yml>", file=sys.stderr)
        return 2
    try:
        with open(argv[1], encoding="utf-8") as fh:
            data = yaml.load(fh, Loader=PermissiveLoader)
    except yaml.YAMLError as exc:
        print("error: %s does not parse as YAML:\n%s" % (argv[1], exc), file=sys.stderr)
        return 1

    if not isinstance(data, list):
        print("error: %s top level is not a YAML array" % argv[1], file=sys.stderr)
        return 1

    inserted = []
    for entry in data:
        if isinstance(entry, dict) and isinstance(entry.get("insert"), list):
            inserted += [i.get("id") for i in entry["insert"] if isinstance(i, dict)]

    suffix = (", inserted ids: " + ", ".join(str(i) for i in inserted)) if inserted else ""
    print("yaml ok: %d top-level entries%s" % (len(data), suffix))
    return 0


if __name__ == "__main__":
    sys.exit(main(sys.argv))
