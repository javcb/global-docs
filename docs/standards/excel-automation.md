<!-- type: reference -->

# Excel automation standards

- keep reusable Excel operations centralized
- isolate workbook-specific logic from generic file operations
- document assumptions about sheet names, ranges, refresh behavior, and output files
- treat Power Query refresh logic as reusable infrastructure where possible