"use client";
import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import {
  Box,
  Button,
  Avatar,
  Typography,
  TextField,
  Divider,
  CircularProgress,
  Alert,
  Snackbar,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import styles from "@/styles/Pending/ProfileStyles";
import { profileStyles as shellStyles } from "@/styles/Profile/ProfileStyles";
import { Sidebar } from "@/components/Admin/Sidebar";
import { Header } from "@/components/Admin/Header";
import { getUserDetails, updateStatus } from "@/lib/api/users";
import {
  Teacher,
  SnackbarState,
  ROLE_MAP,
  EMPLOYMENT_TYPE_MAP,
} from "@/lib/types/users";

export default function UserDetails() {
  const [user, setUser] = useState<Teacher | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const params = useParams();
  const [snackbar, setSnackbar] = useState<SnackbarState>({
    open: false,
    message: "",
    severity: "success",
  });
  const [preview, setPreview] = useState<{
    open: boolean;
    url: string;
    name: string;
    isPdf: boolean;
  }>({
    open: false,
    url: "",
    name: "",
    isPdf: false,
  });
  const userId = params.user_id as string;

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const response = await getUserDetails(userId);
        setUser(response as Teacher);
      } catch (error) {
        setSnackbar({
          open: true,
          message: "Error fetching user details",
          severity: "error",
        });
        router.push("/pending");
      } finally {
        setLoading(false);
      }
    };

    fetchUserDetails();
  }, []);

  const onBack = () => {
    router.push("/pending");
  };

  const credentials = Array.isArray(user?.credentials) ? user.credentials : [];

  const isPdfFile = (url?: string, name?: string) => {
    const source = `${url || ""} ${name || ""}`.toLowerCase();
    return source.includes(".pdf");
  };

  const openPreview = (doc: { url?: string; name?: string }) => {
    setPreview({
      open: true,
      url: doc.url || "",
      name: doc.name || "Document",
      isPdf: isPdfFile(doc.url, doc.name),
    });
  };

  const closePreview = () => {
    setPreview({ open: false, url: "", name: "", isPdf: false });
  };

  const onApprove = async () => {
    try {
      await updateStatus({
        id: user.id,
        actionFlag: "review_profile",
        approve: true,
      });
      setSnackbar({
        open: true,
        message: "User approved successfully",
        severity: "success",
      });
      setTimeout(() => {
        router.push("/pending");
      }, 1500);
    } catch (error) {
      setSnackbar({
        open: true,
        message: "Error approving user",
        severity: "error",
      });
    }
  };

  const onReject = async () => {
    try {
      await updateStatus({
        id: user.id,
        actionFlag: "review_profile",
        approve: false,
      });
      setSnackbar({
        open: true,
        message: "User rejected successfully",
        severity: "success",
      });
      setTimeout(() => {
        router.push("/pending");
      }, 1500);
    } catch (error) {
      setSnackbar({
        open: true,
        message: "Error rejecting user",
        severity: "error",
      });
    }
  };

  if (loading) {
    return (
      <Box sx={shellStyles.container}>
        <Sidebar />
        <Box sx={shellStyles.mainContent}>
          <Header />
          <Box sx={shellStyles.contentWrapper}>
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                minHeight: "60vh",
              }}
            >
              <CircularProgress />
            </Box>
          </Box>
        </Box>
      </Box>
    );
  }

  return (
    <Box sx={shellStyles.container}>
      <Sidebar />
      <Box sx={shellStyles.mainContent}>
        <Header />
        <Box sx={shellStyles.contentWrapper}>
          <Box sx={styles.page}>
            <Box
              sx={{
                ...styles.detailCard,
                maxWidth: 1150,
                mx: "auto",
              }}
            >
              <Box sx={styles.detailCardBody}>
                <Button
                  startIcon={<ArrowBackIosNewIcon sx={{ fontSize: 14 }} />}
                  sx={styles.backBtn}
                  onClick={onBack}
                  disableRipple
                >
                  Back to list
                </Button>

                <Box
                  sx={{
                    display: "flex",
                    gap: 4,
                    alignItems: "flex-start",
                    flexDirection: { xs: "column", md: "row" },
                  }}
                >
                  <Box sx={styles.avatarWrap}>
                    <Avatar src={user?.avatar_url} sx={styles.avatar}>
                      {user?.full_name
                        ? user.full_name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")
                            .toUpperCase()
                            .slice(0, 2)
                        : "??"}
                    </Avatar>
                    <Typography sx={styles.name}>{user?.full_name}</Typography>
                    <Typography sx={styles.role}>
                      {ROLE_MAP[user?.role]}
                    </Typography>
                  </Box>

                  <Box sx={styles.formGrid}>
                    <Box>
                      <Typography sx={styles.label}>Full Name</Typography>
                      <TextField
                        fullWidth
                        size="small"
                        value={user?.full_name}
                        sx={styles.input}
                        InputProps={{ readOnly: true }}
                      />
                    </Box>
                    <Box>
                      <Typography sx={styles.label}>Email Address</Typography>
                      <TextField
                        fullWidth
                        size="small"
                        value={user?.email}
                        sx={styles.input}
                        InputProps={{ readOnly: true }}
                      />
                    </Box>

                    <Box>
                      <Typography sx={styles.label}>Employment Type</Typography>
                      <TextField
                        fullWidth
                        size="small"
                        value={EMPLOYMENT_TYPE_MAP[user?.teacher_type] || "N/A"}
                        sx={styles.input}
                        InputProps={{ readOnly: true }}
                      />
                    </Box>
                    <Box>
                      <Typography sx={styles.label}>Experience Year</Typography>
                      <TextField
                        fullWidth
                        size="small"
                        value={user?.experience_year}
                        sx={styles.input}
                        InputProps={{ readOnly: true }}
                      />
                    </Box>

                    <Box sx={styles.fieldFull}>
                      <Typography sx={styles.label}>Workplace</Typography>
                      <TextField
                        fullWidth
                        size="small"
                        value={user?.current_workplace}
                        sx={styles.input}
                        InputProps={{ readOnly: true }}
                      />
                    </Box>

                    <Box sx={styles.fieldFull}>
                      <Typography sx={styles.label}>Introduction</Typography>
                      <TextField
                        fullWidth
                        size="small"
                        value={user?.introduction}
                        sx={styles.input}
                        InputProps={{ readOnly: true }}
                      />
                    </Box>

                    <Box sx={styles.fieldFull}>
                      <Typography sx={styles.label}>Documents</Typography>
                      {credentials.length > 0 ? (
                        <Box sx={styles.documentsList}>
                          {credentials.map((doc) => (
                            <Box key={doc.id} sx={styles.documentItem}>
                              {isPdfFile(doc.url, doc.name) ? (
                                <Box sx={styles.pdfCard}>
                                  <PictureAsPdfIcon sx={styles.pdfIcon} />
                                  <Typography sx={styles.pdfName}>
                                    {doc.name || "Document.pdf"}
                                  </Typography>
                                </Box>
                              ) : (
                                <Box
                                  component="img"
                                  src={doc.url}
                                  alt={doc.name || "Credential image"}
                                  sx={styles.documentImage}
                                />
                              )}

                              <Box
                                className="doc-overlay"
                                sx={styles.documentOverlay}
                              >
                                <Button
                                  startIcon={<VisibilityOutlinedIcon />}
                                  sx={styles.overlayViewBtn}
                                  onClick={() => openPreview(doc)}
                                >
                                  View
                                </Button>
                              </Box>
                            </Box>
                          ))}
                        </Box>
                      ) : (
                        <Typography sx={styles.emptyDocuments}>
                          No documents uploaded
                        </Typography>
                      )}
                      <Divider sx={styles.divider} />

                      <Box sx={styles.actions}>
                        <Button
                          sx={styles.approveBtn}
                          startIcon={<CheckCircleOutlineIcon />}
                          onClick={onApprove}
                        >
                          Approve
                        </Button>
                        <Button
                          sx={styles.rejectBtn}
                          startIcon={<CancelOutlinedIcon />}
                          onClick={onReject}
                        >
                          Reject
                        </Button>
                      </Box>
                    </Box>
                  </Box>
                </Box>
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>

      <Dialog
        open={preview.open}
        onClose={closePreview}
        maxWidth="lg"
        fullWidth
      >
        <DialogTitle>{preview.name}</DialogTitle>
        <DialogContent dividers>
          {preview.isPdf ? (
            <Box
              component="iframe"
              src={preview.url}
              title={preview.name}
              sx={styles.previewPdf}
            />
          ) : (
            <Box
              component="img"
              src={preview.url}
              alt={preview.name}
              sx={styles.previewImage}
            />
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={closePreview}>Close</Button>
        </DialogActions>
      </Dialog>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={() => setSnackbar((prev) => ({ ...prev, open: false }))}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert
          onClose={() => setSnackbar((prev) => ({ ...prev, open: false }))}
          severity={snackbar.severity}
          sx={{ width: "100%" }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
}
