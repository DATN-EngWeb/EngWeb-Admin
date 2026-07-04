"use client";

import { ReactNode } from "react";
import {
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Tooltip,
} from "@mui/material";
import { Edit } from "@mui/icons-material";
import { rulesStyles as styles } from "@/styles/Rules/RulesStyles";

export type Column<T> = {
  header: string;
  width: number;
  render: (row: T) => ReactNode;
};

type RuleTableProps<T> = {
  columns: Column<T>[];
  rows: T[];
  onEdit: (row: T) => void;
};

const ACTIONS_WIDTH = 1;

// A shared table used by every rule tab. Each tab only passes its columns,
// its rows, and what to do when the edit button is clicked.
export function RuleTable<T extends { id: number }>({
  columns,
  rows,
  onEdit,
}: RuleTableProps<T>) {
  const totalWidth =
    columns.reduce((sum, column) => sum + column.width, 0) + ACTIONS_WIDTH;

  function toPercent(width: number) {
    return `${(width / totalWidth) * 100}%`;
  }

  return (
    <TableContainer component={Paper} sx={styles.tableContainer}>
      <Table sx={{ tableLayout: "fixed" }}>
        <colgroup>
          {columns.map((column) => (
            <col
              key={column.header}
              style={{ width: toPercent(column.width) }}
            />
          ))}
          <col style={{ width: toPercent(ACTIONS_WIDTH) }} />
        </colgroup>

        <TableHead>
          <TableRow sx={styles.tableHeaderRow}>
            {columns.map((column) => (
              <TableCell key={column.header} sx={styles.tableHeaderCell}>
                {column.header}
              </TableCell>
            ))}
            <TableCell sx={styles.actionsHeaderCell}>Action</TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.id} hover>
              {columns.map((column) => (
                <TableCell key={column.header}>{column.render(row)}</TableCell>
              ))}
              <TableCell sx={styles.actionsCell}>
                <Tooltip title="Edit">
                  <IconButton
                    size="small"
                    sx={styles.editIconButton}
                    onClick={() => onEdit(row)}
                  >
                    <Edit fontSize="small" />
                  </IconButton>
                </Tooltip>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
