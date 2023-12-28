import React from "react";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";

const Footer = () => {
  return (
    <table style={{width:"100%", position: "fixed", bottom: "2px"}}>
        <tbody>
        <tr>
            <td>
            <Typography variant="body2" color="textSecondary" align="left">
                &nbsp;&nbsp;
                <Link href="https://github.com/API-Flows" color="textSecondary" underline="hover" >GitHub</Link>
                &nbsp;•&nbsp;
                <Link href="/" color="textSecondary" underline="hover" >Cookies</Link>
            </Typography>
            </td>
        </tr>
        </tbody>
    </table>
  );
};

export default Footer;
