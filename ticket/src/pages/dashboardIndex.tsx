import React from "react";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import { Tooltip, TooltipProps, tooltipClasses } from "@mui/material";
import styled from "@emotion/styled";

export default function DashboardIndex() {
  return (
    <div className="dashboard-viewer">
      <h3 className="text-[32px] leading-10 font-semibold tracking-[-0.01em] flex items-center gap-4">
        Boards List
        <BootstrapTooltip arrow title="Complete view of all of your boards.">
          <InfoOutlinedIcon sx={{ width: 20, mt: "4px" }} />
        </BootstrapTooltip>
      </h3>
      <h6 className="text-[17px] font-medium text-gray-500 tracking-[-0.01em]">
        Welcome back, User Name |{" "}
        {new Date().toLocaleString("default", {
          month: "long",
          day: "numeric",
        })}
      </h6>
    </div>
  );
}

const BootstrapTooltip = styled(({ className, ...props }: TooltipProps) => (
  <Tooltip {...props} arrow classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .${tooltipClasses.arrow}`]: {
    color: "black",
  },
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: "black",
    fontSize: 14,
    padding: "5px 10px",
    borderRadius: 8,
  },
}));
