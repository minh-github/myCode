<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>

<body>
    <input type="search" id="address" class="form-control" placeholder="Where are we going?" />

    <p>Selected: <strong id="address-value">none</strong></p>
    <script src="https://cdn.jsdelivr.net/npm/places.js@1.19.0"></script>
    <script>
    (function() {
        var placesAutocomplete = places({
            appId: 'VO46GJH2V2',
            apiKey: '57bbbf6061190c13214f3a2f65ea62cc',
            container: document.querySelector('#address')
        });

        var $address = document.querySelector('#address-value')
        placesAutocomplete.on('change', function(e) {
            $address.textContent = e.suggestion.value
        });

        placesAutocomplete.on('clear', function() {
            $address.textContent = 'none';
        });

    })();
    </script>
</body>

</html>