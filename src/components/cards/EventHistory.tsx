import React, { useEffect, useState } from "react";
import dayjs from "dayjs";
import "dayjs/locale/es";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ClickAwayListener from '@mui/material/ClickAwayListener';
import Grow from '@mui/material/Grow';
import Popper from '@mui/material/Popper';
import MenuItem from '@mui/material/MenuItem';
import MenuList from '@mui/material/MenuList';
import IconButton from "@mui/material/IconButton";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { getInternEvents } from "../../services/internService";
import { EventInternsType } from "../../models/eventInterface";

dayjs.locale("es");

const capitalizeFirstLetter = (string: string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};
const statusTranslation = (status: string) => {
  const statusMap: Record<string, string> = {
    accepted: "Aceptado",
    rejected: "Rechazado",
    reserve: "Suplente",
    pending: "Pendiente"
  };
  return statusMap[status.toLowerCase()] || status;
};

const groupEventsByMonth = (events: EventInternsType[]): Record<string, EventInternsType[]> => {
  return events?.reduce((acc: Record<string, EventInternsType[]>, event: EventInternsType) => {
    const month = capitalizeFirstLetter(dayjs(event.start_date).format("MMMM YYYY"));
  if (!acc[month]) {
      acc[month] = [];
    }
    acc[month].push(event);
    return acc;
  }, {});
};

const SplitButton = ({ options }: { options: { label: string, onClick: () => void }[] }) => {
  const [open, setOpen] = useState(false);
  const anchorRef = React.useRef<HTMLDivElement>(null);
  const [selectedIndex, setSelectedIndex] = useState(0);

  const handleClick = () => {
    options[selectedIndex].onClick();
  };

  const handleMenuItemClick = (index: number) => {
    setSelectedIndex(index);
    setOpen(false);
    options[index].onClick();
  };

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event: MouseEvent | TouchEvent) => {
    if (anchorRef.current && anchorRef.current.contains(event.target as HTMLElement)) {
      return;
    }
    setOpen(false);
  };

  return (
    <>
      <ButtonGroup variant="contained" ref={anchorRef}  style={{ marginLeft: '3%', marginTop:'19px' }}>
        <Button onClick={handleClick}>{options[selectedIndex].label}</Button>
        <Button size="small" onClick={handleToggle} >
          <ArrowDropDownIcon />
        </Button>
      </ButtonGroup>
      <Popper open={open} anchorEl={anchorRef.current} role={undefined} transition disablePortal>
        {({ TransitionProps }) => (
          <Grow {...TransitionProps} style={{ transformOrigin: 'center top' }}>
            <div>
              <ClickAwayListener onClickAway={handleClose}>
                <MenuList autoFocusItem>
                  {options.map((option, index) => (
                    <MenuItem key={option.label} selected={index === selectedIndex} onClick={() => handleMenuItemClick(index)}>
                      {option.label}
                    </MenuItem>
                  ))}
                </MenuList>
              </ClickAwayListener>
            </div>
          </Grow>
        )}
      </Popper>
    </>
  );
};

const EventHistory = () => {
  
  const [historyEvents, setHistoryEvents] = useState<EventInternsType[]>();
  const [selectedSemester, setSelectedSemester] = useState<number | null>(null);
  const fetchEvents = async () => {
    const res = await getInternEvents(1);
    if (res.success) {
      setHistoryEvents(res.data);
    }
  };
  
  useEffect(() => {
    fetchEvents();
  }, []);
  
  const filteredEvents = (semester: number) =>
    historyEvents?.filter((event) =>
      semester === 0
        ? dayjs(event.start_date).isBefore(dayjs("2024-07-01"))
        : dayjs(event.start_date).isAfter(dayjs("2024-06-30"))
  );
  
  const groupedEvents = (semester: number) => groupEventsByMonth(filteredEvents(semester));
  
  return (
    <div style={{ position: 'relative'}}>
      <IconButton
        onClick={() => window.history.back()}
        aria-label="back"
        style={{
          position: 'absolute',
          top: '17px',
          left: '-9px',
        }}
      >
        <ArrowBackIcon />
      </IconButton>

      <SplitButton
        options={[
          { label: 'Primer Semestre', onClick: () => setSelectedSemester(0) },
          { label: 'Segundo Semestre', onClick: () => setSelectedSemester(1) }
        ]}
      />

      {selectedSemester !== null && Object.entries(groupedEvents(selectedSemester)).map(([month, events]) => (
        <div key={month} style={{ marginBottom: '20px' }}>
          <Typography variant="h6" style={{ color: 'blue' }}>{month}</Typography>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '20px', maxWidth: '100%' }}>
            {events.map(({ id, title, start_date, location, duration_hours, type }) => (
              <div key={id} style={{ border: '1px solid #ccc', padding: '20px', boxSizing: 'border-box', height: '200px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                <Typography variant="body2" style={{ fontWeight: 'bold' }}>
                  {title} - {dayjs(start_date).format("DD MMM YYYY")}
                </Typography>
                <div style={{ borderTop: '1px solid #ddd', paddingTop: '10px', marginTop: '10px', flexGrow: 1 }}>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '10px' }}>
                  </div>
                </div>
                <Typography variant="body2">Lugar: {location}</Typography>
                <Typography variant="body2">Horas validadas: {duration_hours}</Typography>
                <Typography variant="body2" style={{ color: type === "accepted" ? "green" : "red" }}>
                  {statusTranslation(type)}
                </Typography>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default EventHistory;