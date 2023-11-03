
DOMReady(() => {
    psgdpr_front_controller = psgdpr_front_controller.replace(/\amp;/g,'');

    eventHandlerOn(document, 'click', '#exportPersonalData', (e) => {
      const { request } = useHttpRequest(psgdpr_front_controller);

      request
        .query({
          ajax: true,
          action: test,
          id_customer: psgdpr_id_customer
        })
        .post()
        .then((data) => {
          console.log(data);
        })
        .catch((err) => {
          console.log(err);
        });
    });
});
