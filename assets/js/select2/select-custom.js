$(document).ready(function () {
    $('.select2-enable').select2({
        placeholder: "Select option",
        width: '100%',
        minimumResultsForSearch: Infinity  // Disable search bar
    });
});
// modal slect2 
$(document).ready(function () {
    $('.select2-modal').select2({
        placeholder: "Select option",
        width: '100%',
        minimumResultsForSearch: Infinity,
        dropdownParent: $('#deactive-host')
    });
});
$('#filterModal').on('shown.bs.modal', function () {

    let $modal = $(this);

    // Destroy old Select2
    $modal.find('.modal-select').each(function () {
        if ($(this).data('select2')) {
            $(this).select2('destroy');
        }
    });

    // Initialize Select2 inside modal
    $modal.find('.modal-select').select2({
        placeholder: "Select option",
        width: "100%",
        minimumResultsForSearch: Infinity,
        dropdownParent: $modal.find('.modal-content')  // perfect fix
    });

});
$(document).ready(function () {
    $('#subjectSelect').select2({
        placeholder: 'Search or type subject (e.g. Algebra, Computer)',
        tags: true,
        allowClear: true,
        width: '100%',
        dropdownParent: $('#subjectModal')
    });
});