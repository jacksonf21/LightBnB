$(() => {

  const $newReservationForm = $(`
  <form action="/api/properties" method="post" id="new-property-form" class="new-property-form">

      <div class="new-property-form__field-wrapper">
        <label for="new-property-form__thumbnail">start-date</label>
        <input placeholder="start-date" type="text" name="start_date" id="new-property-form__thumbnail">

        <label for="new-property-form__thumbnail">end-date</label>
        <input placeholder="end-date" type="text" name="end_date" id="new-property-form__thumbnail">
      </div>

      <div class="new-property-form__field-wrapper">
        <label for="new-property-form__thumbnail">property_id</label>
        <input placeholder="property_id" type="text" name="property_id" id="new-property-form__thumbnail">
      </div>

      <hr>

        <div class="new-property-form__field-wrapper">
            <button>Create</button>
            <a id="property-form__cancel" href="#">Cancel</a>
        </div>
        
    </form>
  `);

  window.$newReservationForm = $newReservationForm;

  $newReservationForm.on('submit', function (event) {
    event.preventDefault();

    views_manager.show('none');



    // $.ajax({
    //   type: 'POST',
    //   url: '/reservations',
    //   data: tweet,
    //   success: () => views_manager.show('listings')
    // });

    const data = $(this).serialize();
    submitReservation(data)
      .then(() => {
        views_manager.show('listings');
      })
      .catch((error) => {
        console.error(error);
        views_manager.show('listings');
      });
  });

  $('body').on('click', '#property-form__cancel', function() {
    views_manager.show('listings');
    return false;
  });
  
});