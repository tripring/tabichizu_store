import Typography from "@mui/material/Typography";

export default function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <a
        href="https://tabichizu.com/"
        target="_blank"
        rel="noopener noreferrer"
        style={{ color: "inherit", textDecoration: "None" }}
      >
        たびちず
      </a>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}
