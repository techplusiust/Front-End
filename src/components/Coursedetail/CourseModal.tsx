import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  Typography,
} from "@mui/material";
import { useEffect } from "react";

interface CourseModalProps {
  isModal: boolean;
  onClose: () => void;
}

const CourseModal: React.FC<CourseModalProps> = ({ isModal, onClose }) => {

  if (isModal) {
    return (
      <>
        <Dialog
          open={isModal}
          onClose={onClose}
          fullWidth
          maxWidth="sm"
          sx={{
            "& .MuiDialog-paper": {
              padding: 3,
              borderRadius: 5,
              border: "5px solid #1976D2",
            },
            "& .MuiDialogContent-root": {
              padding: 2,
            },
            "& .MuiDialogActions-root": {
              padding: 1,
            },
          }}
        >
          <DialogTitle sx={{ m: 0, p: 2 }}>
            <p
              style={{ fontFamily: "iranyekan", fontSize: "16px" }}
              className="font-bold text-xl mb-4"
            >
              اطلاعات درس
            </p>
          </DialogTitle>
          <DialogContent>
            <Grid container gap={4}>
            <Box>
              {/* <Typography variant="subtitle1"><p style={{fontFamily:'iranyekan',fontSize:'16px'}} className="font-bold">ظرفیت</p></Typography> */}
              <Box
                sx={{
                  borderRadius: 2,
                  padding: 1,
                //   backgroundColor: "#C0C0C0",
                  width: 230,
                }}
              >
                <Typography variant="h6">
                  {/* {data.active? "Active":"Not active"  } */}
                  <image><img width={110} height={110} src="public\vite.svg"/></image>
                </Typography>
              </Box>
            </Box>
            <Box>
                <Typography variant="subtitle1">
                  <p
                    style={{ fontFamily: "iranyekan", fontSize: "16px" }}
                    className="font-bold"
                  >
                    استاد :
                  </p>
                </Typography>
                <Box
                  sx={{
                    borderRadius: 2,
                    padding: 1,
                    backgroundColor: "#C0C0C0",
                    width: 230,
                  }}
                >
                  <Typography variant="h6">
                    {/* {data.active? "Active":"Not active"  } */}
                    data active
                  </Typography>
                </Box>
              </Box>
            </Grid>
            <Grid container gap={4}>
              <Box>
                <Typography variant="subtitle1">
                  <p
                    style={{ fontFamily: "iranyekan", fontSize: "16px" }}
                    className="font-bold"
                  >
                    نام درس :
                  </p>
                </Typography>
                <Box
                  sx={{
                    borderRadius: 2,
                    padding: 1,
                    backgroundColor: "#C0C0C0",
                    width: 495,
                  }}
                >
                  <Typography variant="h6">
                    {/* {data.title} */}
                    title
                  </Typography>
                </Box>
              </Box>
              <Box>
                <Typography variant="subtitle1">
                  <p
                    style={{ fontFamily: "iranyekan", fontSize: "16px" }}
                    className="font-bold"
                  >
                    کد درس :
                  </p>
                </Typography>
                <Box
                  sx={{
                    borderRadius: 2,
                    padding: 1,
                    backgroundColor: "#C0C0C0",
                    width: 230,
                  }}
                >
                  <Typography variant="h6">
                    {/* {data.created_at} */}
                    data active
                  </Typography>
                </Box>
              </Box>
              <Box>
                <Typography variant="subtitle1">
                  <p
                    style={{ fontFamily: "iranyekan", fontSize: "16px" }}
                    className="font-bold"
                  >
                    جنسیت :
                  </p>
                </Typography>
                <Box
                  sx={{
                    borderRadius: 2,
                    padding: 1,
                    backgroundColor: "#C0C0C0",
                    width: 230,
                  }}
                >
                  <Typography variant="h6">
                    {/* {data.active? "Active":"Not active"  } */}
                    data active
                  </Typography>
                </Box>
              </Box>
              
              <Box>
                <Typography variant="subtitle1">
                  <p
                    style={{ fontFamily: "iranyekan", fontSize: "16px" }}
                    className="font-bold"
                  >
                    ظرفیت :
                  </p>
                </Typography>
                <Box
                  sx={{
                    borderRadius: 2,
                    padding: 1,
                    backgroundColor: "#C0C0C0",
                    width: 230,
                  }}
                >
                  <Typography variant="h6">
                    {/* {data.active? "Active":"Not active"  } */}
                    data active
                  </Typography>
                </Box>
              </Box>
              <Box>
                <Typography variant="subtitle1">
                  <p
                    style={{ fontFamily: "iranyekan", fontSize: "16px" }}
                    className="font-bold"
                  >
                    زمان برگزاری :
                  </p>
                </Typography>
                <Box
                  sx={{
                    borderRadius: 2,
                    padding: 1,
                    backgroundColor: "#C0C0C0",
                    width: 230,
                  }}
                >
                  <Typography variant="h6">
                    {/* {data.active? "Active":"Not active"  } */}
                    data active
                  </Typography>
                </Box>
              </Box>
              <Box>
                <Typography variant="subtitle1">
                  <p
                    style={{ fontFamily: "iranyekan", fontSize: "16px" }}
                    className="font-bold"
                  >
                    زمان آزمون :
                  </p>
                </Typography>
                <Box
                  sx={{
                    borderRadius: 2,
                    padding: 1,
                    backgroundColor: "#C0C0C0",
                    width: 495,
                  }}
                >
                  <Typography variant="h6">
                    {/* {data.active? "Active":"Not active"  } */}
                    data active
                  </Typography>
                </Box>
              </Box>
              <Box>
                <Typography>
                  <p
                    style={{ fontFamily: "iranyekan", fontSize: "16px" }}
                    className="font-bold"
                  >
                    توضیحات :{" "}
                  </p>
                </Typography>
                <Box
                  sx={{
                    borderRadius: 2,
                    padding: 1,
                    backgroundColor: "#C0C0C0",
                    width: 495,
                  }}
                >
                  <Typography variant="h6">
                    {/* {data.description} */}
                    data description
                  </Typography>
                </Box>
              </Box>
            </Grid>
          </DialogContent>
          <DialogActions>
            <Button variant="outlined" onClick={onClose}>
              <p
                style={{ fontFamily: "iranyekan", fontSize: "16px" }}
                className="font-bold"
              >
                باشه
              </p>
            </Button>
          </DialogActions>
        </Dialog>
      </>
    );
  }

  return null;
};

export default CourseModal;
