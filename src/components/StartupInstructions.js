import React, {useState} from "react";
import {Button, Carousel, CarouselItem, Image, Modal, ModalBody} from "react-bootstrap";
import {useTranslation} from "react-i18next";
import "./StartupInstructions.css";
import {
  IOSView,
  MobileOnlyView,
  TabletView,
  BrowserView,
  CustomView,
  browserVersion,
  browserName
} from 'react-device-detect';

const IPAD_SHOWED_KEY = 'ipad-instruction-showed';
const IPHONE_SHOWED_KEY = 'iphone-instruction-showed';
const IPHONE12_SHOWED_KEY = 'iphone12-instruction-showed';

const SLIDE_INTERVAL = 3000;

export default function StartupInstructions({...props}) {
  const ipadShowStatus = localStorage.getItem(IPAD_SHOWED_KEY);
  const iphoneShowStatus = localStorage.getItem(IPHONE_SHOWED_KEY);
  const iphone12ShowStatus = localStorage.getItem(IPHONE12_SHOWED_KEY);

  console.log(ipadShowStatus, iphoneShowStatus);

  const { t } = useTranslation();
  const [ipadShow, setIpadShow] = useState(ipadShowStatus);
  const [iphoneShow, setIphoneShow] = useState(iphoneShowStatus);
  const [iphone12Show, setIphone12Show] = useState(iphone12ShowStatus);

  function handleIpadClose() {
    setIpadShow(false);
    localStorage.setItem(IPAD_SHOWED_KEY, true);
  }

  function handleIphoneClose() {
    setIphoneShow(false);
    localStorage.setItem(IPHONE_SHOWED_KEY, true);
  }
  function handleIphone12Close() {
    setIphone12Show(false);
    localStorage.setItem(IPHONE12_SHOWED_KEY, true);
  }

  return (
    <>
        <IOSView>
          <TabletView>
            <Modal {...props} show={ipadShow} onHide={handleIpadClose}>
              <Modal.Header closeButton>
                <Modal.Title>{t("How to add Szotki as Application on iPad") + "?"}</Modal.Title>
              </Modal.Header>

              <ModalBody>
                <div className="ipad-instruction-carousel">
                  <Carousel wrap={false} interval={SLIDE_INTERVAL}>
                    <CarouselItem>
                      <Image src="img/instructions/iPad/001.jpg" rounded/>
                    </CarouselItem>
                    <CarouselItem>
                      <Image src="img/instructions/iPad/002.jpg" rounded/>
                    </CarouselItem>
                    <CarouselItem>
                      <Image src="img/instructions/iPad/003.jpg" rounded/>
                    </CarouselItem>
                  </Carousel>
                </div>
              </ModalBody>

              <Modal.Footer>
                <Button variant="secondary" onClick={handleIpadClose}>{t("Close")}</Button>
              </Modal.Footer>

            </Modal>
          </TabletView>

          <MobileOnlyView>
            <Modal className="iphone-instruction" {...props} show={iphoneShow} onHide={handleIphoneClose} >
              <Modal.Header closeButton>
                <Modal.Title>{t("How to add Szotki as Application on iPhone")}?</Modal.Title>
              </Modal.Header>

              <ModalBody>
                <div className="iphone-instruction-carousel">
                  <Carousel wrap={false} interval={SLIDE_INTERVAL}>
                    <CarouselItem>
                      <Image src="img/instructions/iPhone/001.jpg" rounded/>
                    </CarouselItem>
                    <CarouselItem>
                      <Image src="img/instructions/iPhone/002.jpg" rounded/>
                    </CarouselItem>
                    <CarouselItem>
                      <Image src="img/instructions/iPhone/003.jpg" rounded/>
                    </CarouselItem>
                  </Carousel>
                </div>
              </ModalBody>

              <Modal.Footer>
                <Button variant="secondary" onClick={handleIphoneClose}>{t("Close")}</Button>
              </Modal.Footer>

            </Modal>
          </MobileOnlyView>
        </IOSView>

      <BrowserView>
        <CustomView condition={parseInt(browserVersion) <= 12 && browserName === "Safari"}>
        <Modal className="iphone12-instruction" {...props} show={iphone12Show} onHide={handleIphone12Close} >
          <Modal.Header closeButton>
            <Modal.Title>{t("How to add Szotki as Application on iPhone")}?</Modal.Title>
          </Modal.Header>

          <ModalBody>
            <div className="iphone12-instruction-carousel">
              <Carousel wrap={false} interval={SLIDE_INTERVAL}>
                <CarouselItem>
                  <Image src="img/instructions/iPhone12/001.jpg" rounded/>
                </CarouselItem>
                <CarouselItem>
                  <Image src="img/instructions/iPhone12/002.jpg" rounded/>
                </CarouselItem>
                <CarouselItem>
                  <Image src="img/instructions/iPhone12/003.jpg" rounded/>
                </CarouselItem>
                <CarouselItem>
                  <Image src="img/instructions/iPhone12/004.jpg" rounded/>
                </CarouselItem>
              </Carousel>
            </div>
          </ModalBody>

          <Modal.Footer>
            <Button variant="secondary" onClick={handleIphone12Close}>{t("Close")}</Button>
          </Modal.Footer>

        </Modal>
        </CustomView>
      </BrowserView>

    </>);
    }
