import React from "react";
import { Box, Paper, Stack} from "@mui/system";
import { Typography } from "@mui/material";
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import YouTubeIcon from '@mui/icons-material/YouTube';

const Footer = () => {
  return (
    <Box sx={{ backgroundColor: "#080212",borderRadius:'5px' }}  minWidth="800px">
      <Stack
        direction="row"
        spacing={10}
        sx={{ justifyContent: "center", padding: "15px" }}
       
      >
        <Stack >
          <Typography component="body2" sx={{ color: "#9facc2" }}>
            ABOUT
          </Typography>
          <Typography
            component="a"
            href="#"
            sx={{ color: "#9facc2", fontSize: "14px" }}
          >
            About Us
          </Typography>
          <Typography
            component="a"
            href="#"
            sx={{ color: "#9facc2", fontSize: "14px" }}
          >
            Contact Us
          </Typography>
        </Stack>
        <Stack>
          <Typography component="body2" sx={{ color: "#9facc2" }}>
            HELP
          </Typography>
          <Typography
            component="a"
            href="#"
            sx={{ color: "#9facc2", fontSize: "14px" }}
          >
            Payments
          </Typography>
          <Typography
            component="a"
            href="#"
            sx={{ color: "#9facc2", fontSize: "14px" }}
          >
            Shipping
          </Typography>
          <Typography
            component="a"
            href="#"
            sx={{ color: "#9facc2", fontSize: "14px" }}
          >
            Cancellation & Return
          </Typography>
        </Stack>
        <Stack>
          <Typography component="body2" sx={{ color: "#9facc2" }}>
            POLUCY
          </Typography>
          <Typography
            component="a"
            href="#"
            sx={{ color: "#9facc2", fontSize: "14px" }}
          >
            Return Policy
          </Typography>
          <Typography
            component="a"
            href="#"
            sx={{ color: "#9facc2", fontSize: "14px" }}
          >
            Terms Of Use
          </Typography>
          <Typography
            component="a"
            href="#"
            sx={{ color: "#9facc2", fontSize: "14px" }}
          >
            Security
          </Typography>
          <Typography
            component="a"
            href="#"
            sx={{ color: "#9facc2", fontSize: "14px" }}
          >
            Privacy
          </Typography>
        </Stack>
        <Stack>
          <Typography component="body2" sx={{ color: "#9facc2" }}>
            SOCIAL
          </Typography>
          <Typography
            component="a"
            href="https://www.facebook.com/"
            sx={{ color: "#9facc2", fontSize: "14px" }}
            
          >
            <FacebookIcon fontSize="small"/>
          </Typography>
          <Typography
            component="a"
            href="https://twitter.com/"
            sx={{ color: "#9facc2", fontSize: "14px" }}
          >
            <TwitterIcon fontSize="small" />
          </Typography>
          <Typography
            component="a"
            href="https://www.youtube.com/"
            sx={{ color: "#9facc2", fontSize: "14px" }}
          >
            <YouTubeIcon fontSize="small" />
          </Typography>
        </Stack>
      </Stack>
    </Box>
  );
};

export default Footer;
