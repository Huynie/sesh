import * as React from 'react';
import { 
  // Carousel,
  // CarouselItem,
  Button,
  Card,
  CardBody,
  CardTitle,
  CardSubtitle,
  CardText,
  // CardImg,
  List,
  // ListGroup,
  // ListGroupItem,
  Accordion,
  AccordionItem,
  AccordionBody,
  AccordionHeader,
  Tooltip
} from 'reactstrap';

const SideBar = React.forwardRef( ({data}, ref) => {
  const [toggle, setToggle] = React.useState(false);
  const [tooltipToggle, setTooltipToggle] = React.useState(false);
  const [accordionId, setAccordionId] = React.useState();
  const sidebarRight = toggle ? "0" : "-50vw";
  const iconRotate = toggle ? "180" : "0";

  const { sidebarRef, sidebarToggleRef } = ref.current;
  // console.log(ref.current);
  const sidebarClick = () => {
    if(!data) {
      setTooltipToggle(!tooltipToggle);
      return
    }
    setTooltipToggle(false);
    setToggle(!toggle);
  }

  return (
    <div ref={sidebarRef} className="sidebar" style={{right: sidebarRight}}>
      <Button
        innerRef={sidebarToggleRef} 
        onClick={() => sidebarClick()}
        className="sidebar__toggle"
        size="sm"
        id="sidebarToggle"
      >
        <svg xmlns="http://www.w3.org/2000/svg"
          width="16" height="16" fill="currentColor"
          className="bi bi-arrow-bar-left"
          viewBox="0 0 16 16"
          style={{transform: `rotate(${iconRotate}deg)`}}
        >
          <path fillRule="evenodd" d="M12.5 15a.5.5 0 0 1-.5-.5v-13a.5.5 0 0 1 1 0v13a.5.5 0 0 1-.5.5zM10 8a.5.5 0 0 1-.5.5H3.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L3.707 7.5H9.5a.5.5 0 0 1 .5.5z"/>
        </svg>
      </Button>
      <Tooltip
        target="sidebarToggle"
        isOpen={tooltipToggle}
        placement="left"
      >Please pick a spot!</Tooltip>
      <Card className="sidebar__content text-secondary border-0" outline={false} >
        <CardBody>
          <CardTitle tag="h5" className="text-center">{data?.name ? data.name : "Spot Name"}</CardTitle>
          <CardText tag="p" className="fs-6">{data?.address || "address"}</CardText>
          <CardText tag="p">{data?.phone ? data.phone : "Phone Number"}</CardText>
          <CardText tag="p">Host: {data?.host ? data.host : "Host"}</CardText>
        </CardBody>
        <Accordion flush toggle={index => setAccordionId(`${accordionId === '1' ? '0' : index}`)} open={accordionId}>
          <AccordionItem>
            <AccordionHeader targetId="1" >Hours</AccordionHeader>
            <AccordionBody accordionId="1">
                {
                  data && Object.keys(data.hours).map((hour, idx) => {
                    return hour !== "spot_id" && data.hours[hour] != null ? (
                      <CardText key={idx} tag="p">
                        {hour}: {data.hours[hour]}
                      </CardText>
                    ) : null
                  })
                }
              <List>
              </List>
            </AccordionBody>
          </AccordionItem>
          <AccordionItem>
            <CardBody>
              <CardText tag="p">Liability Waver: {data?.waiver ? "required" : "not required"}</CardText>
              <CardText tag="p">Fee: ${data?.price ?? "none"}</CardText>
            </CardBody>
          </AccordionItem>
        </Accordion>
        {/* <AccordionItem></AccordionItem> */}
        {/* Pictures */}
        {/* <Carousel
          activeIndex={activeIndex}
          next={(_,idx) => setActiveIndex(idx)}
          previous={(_,idx) => setActiveIndex(prev => prev)}
        >
          <CarouselItem>item 1</CarouselItem>
          <CarouselItem>item 2</CarouselItem>
          <CarouselItem>item 3</CarouselItem>
        </Carousel> */}
        <div style={{display: 'flex', overflow: 'scroll'}}>
          <div style={{width: "33%", height: '200px', backgroundColor: 'lightgray'}}>pic 1</div>
          <div style={{width: "33%", height: '200px', backgroundColor: 'lightgray'}}>pic 2</div>
          <div style={{width: "33%", height: '200px', backgroundColor: 'lightgray'}}>pic 3</div>
        </div>
        <CardBody>
          <CardSubtitle>Reviews</CardSubtitle>
          <div style={{height: "100%"}}></div>
        </CardBody>
      </Card>
    </div>
  )
});

export default SideBar;
