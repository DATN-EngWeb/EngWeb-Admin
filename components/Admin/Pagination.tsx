"use client";

import { Box, Button, Typography } from "@mui/material";

type PaginationControlsProps = {
  currentPage: number;
  totalPages: number;
  startIndex: number;
  endIndex: number;
  totalCount: number;
  itemLabel?: string;
  onPageChange: (page: number) => void;
};

export function Pagination({
  currentPage,
  totalPages,
  startIndex,
  endIndex,
  totalCount,
  itemLabel = "users",
  onPageChange,
}: PaginationControlsProps) {
  const hasPages = totalPages > 0;
  const displayStart = totalCount > 0 ? startIndex + 1 : 0;
  const displayEnd = totalCount > 0 ? endIndex : 0;

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        mt: 3,
        gap: 2,
        flexWrap: "wrap",
      }}
    >
      <Typography variant="body2" sx={{ color: "text.secondary" }}>
        Showing {displayStart}-{displayEnd} of {totalCount} {itemLabel}.
      </Typography>

      <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap" }}>
        <Button
          onClick={() => onPageChange(Math.max(1, currentPage - 1))}
          disabled={currentPage === 1 || !hasPages}
          sx={{
            color: "primary.main",
            textTransform: "none",
            "&:disabled": {
              color: "grey.400",
            },
          }}
        >
          Prev
        </Button>

        {Array.from({ length: totalPages }, (_, index) => index + 1).map(
          (page) => (
            <Button
              key={page}
              onClick={() => onPageChange(page)}
              sx={{
                minWidth: 40,
                color: currentPage === page ? "primary.main" : "text.secondary",
                bgcolor:
                  currentPage === page ? "secondary.main" : "transparent",
                textTransform: "none",
                fontWeight: currentPage === page ? 600 : 400,
                "&:hover": {
                  bgcolor: currentPage === page ? "secondary.main" : "grey.100",
                },
              }}
            >
              {page}
            </Button>
          ),
        )}

        <Button
          onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
          disabled={currentPage === totalPages || !hasPages}
          sx={{
            color: "primary.main",
            textTransform: "none",
            "&:disabled": {
              color: "grey.400",
            },
          }}
        >
          Next
        </Button>
      </Box>
    </Box>
  );
}
