define(['exports', '../content/content'],
    function (exports, content) {
        var ContentPart = content.ContentPart,
            dummyContent = [
                ContentPart.forImage('https://3.bp.blogspot.com/-qptznv7BBbM/Vx0y98Fo3_I/AAAAAAAABok/ciFbTYuTOBgp' +
                    'Gkfg6RxyhPjPEmbQMFChwCKgB/s320-p/Samuel%2BNetocny_dom%2Bspisska%2Bnova%2Bves06.jpg',
                    'Dom', 'left', '200px'),
                ContentPart.forText('Praesent quam ipsum, interdum a aliquet et, tincidunt eget tellus. ' +
                    'Aliquam molestie ex ac neque tristique, vel mattis elit sollicitudin. Integer imperdiet' +
                    ' libero vel lacus lobortis, vel laoreet leo pretium. Duis imperdiet dictum neque quis ' +
                    'varius. Morbi non justo sapien. Curabitur ornare tincidunt ipsum, at gravida turpis viverra' +
                    ' id. Suspendisse aliquet est ut mi eleifend egestas. Aenean nec nulla eget nisl eleifend ' +
                    'porttitor ut eget nisl. Praesent quis tellus lacinia, ullamcorper velit non, viverra dui. ' +
                    'Morbi tempus neque sit amet pellentesque porta.'),
                ContentPart.forLinkExternal('test external link ', 'http://sme.sk'),
                ContentPart.forLinkInternal('test intenrnal link', ['sk', 'projects', '1']),
                ContentPart.forText('Nam nulla eros, suscipit quis pretium et, elementum in ante. Sed tincidunt' +
                    ' id erat in pretium. Sed molestie at velit nec auctor. Curabitur a risus at justo consequat' +
                    ' congue. Donec finibus, magna nec euismod rutrum, ante dui laoreet lectus, a sollicitudin ' +
                    'enim arcu eu orci. Donec elementum scelerisque nunc ut laoreet. In vulputate odio vel augue ' +
                    'blandit, vitae fermentum odio laoreet. In commodo felis ex, at aliquam dolor efficitur in. ' +
                    'Nullam eget mauris eu nibh imperdiet porta. Phasellus vulputate lorem sem, aliquet pellentesque ' +
                    'velit posuere ut. Mauris ac luctus eros, eget rutrum odio. Morbi quam purus, venenatis vel ' +
                    'interdum id, consectetur id sapien. Pellentesque augue justo, sagittis vitae ullamcorper nec,' +
                    ' accumsan eu massa. In cursus ex molestie congue consectetur. Maecenas placerat dictum turpis' +
                    ' in posuere. Nulla id velit quis ipsum eleifend semper.'),
                ContentPart.forText('Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas purus ' +
                    'nulla, vestibulum in elit a, eleifend imperdiet enim. Duis scelerisque justo ac ligula ' +
                    'dignissim, ut varius purus rutrum. Donec vel felis sed nulla euismod mollis. Phasellus ' +
                    'porttitor pretium vestibulum. Phasellus aliquam venenatis velit vel ultrices. Duis sagittis' +
                    ' erat et mi efficitur venenatis. Praesent laoreet commodo erat eget lobortis. Donec id ' +
                    'cursus nisi.',
                    2),
                ContentPart.forText('Aliquam in malesuada sapien, et venenatis eros. Phasellus ut sem sit amet ' +
                    'dui facilisis pharetra. Duis scelerisque nec sapien id malesuada. Nulla tortor urna, ' +
                    'fringilla at eros eget, pulvinar gravida ante. Pellentesque ut eleifend urna. Sed venenatis,' +
                    ' nisl a vestibulum volutpat, erat felis condimentum neque, eget rutrum augue lacus sagittis' +
                    ' purus. Pellentesque finibus sem eget eleifend dapibus. Pellentesque ac leo non justo sodales' +
                    ' interdum. In fermentum sapien non enim laoreet volutpat. Vestibulum elementum purus risus,' +
                    ' ac tempor risus interdum et. Nulla eu neque eu ante congue placerat. Duis leo est, varius ' +
                    'vitae viverra et, fringilla condimentum lectus. Duis ut quam sit amet eros gravida vehicula ' +
                    'a nec ligula.',
                    3),
                ContentPart.forText('Praesent quam ipsum, interdum a aliquet et, tincidunt eget tellus. ' +
                    'Aliquam molestie ex ac neque tristique, vel mattis elit sollicitudin. Integer imperdiet' +
                    ' libero vel lacus lobortis, vel laoreet leo pretium. Duis imperdiet dictum neque quis ' +
                    'varius. Morbi non justo sapien. Curabitur ornare tincidunt ipsum, at gravida turpis viverra' +
                    ' id. Suspendisse aliquet est ut mi eleifend egestas. Aenean nec nulla eget nisl eleifend ' +
                    'porttitor ut eget nisl. Praesent quis tellus lacinia, ullamcorper velit non, viverra dui. ' +
                    'Morbi tempus neque sit amet pellentesque porta.',
                    2),
                ContentPart.forText('Nam nulla eros, suscipit quis pretium et, elementum in ante. Sed tincidunt' +
                    ' id erat in pretium. Sed molestie at velit nec auctor. Curabitur a risus at justo consequat' +
                    ' congue. Donec finibus, magna nec euismod rutrum, ante dui laoreet lectus, a sollicitudin ' +
                    'enim arcu eu orci. Donec elementum scelerisque nunc ut laoreet. In vulputate odio vel augue ' +
                    'blandit, vitae fermentum odio laoreet. In commodo felis ex, at aliquam dolor efficitur in. ' +
                    'Nullam eget mauris eu nibh imperdiet porta. Phasellus vulputate lorem sem, aliquet pellentesque ' +
                    'velit posuere ut. Mauris ac luctus eros, eget rutrum odio. Morbi quam purus, venenatis vel ' +
                    'interdum id, consectetur id sapien. Pellentesque augue justo, sagittis vitae ullamcorper nec,' +
                    ' accumsan eu massa. In cursus ex molestie congue consectetur. Maecenas placerat dictum turpis' +
                    ' in posuere. Nulla id velit quis ipsum eleifend semper.'),
                ContentPart.forText('Morbi convallis, augue vitae dapibus pellentesque, velit mauris vehicula' +
                    ' metus, vel dignissim dui lacus et elit. Suspendisse potenti. Cras nec justo et metus feugiat' +
                    ' cursus sed sed velit. Nunc pulvinar justo sed vulputate rhoncus. Cras varius sit amet ' +
                    'felis eu malesuada. Nunc id congue felis. Ut ac felis velit.',
                    2)
            ];

        exports.details = {
            'projects': {
                'sk': {
                    "1": {
                        content: dummyContent
                    },
                    "2": {
                        content: dummyContent
                    },
                    "3": {
                        content: dummyContent
                    },
                    "4": {
                        content: dummyContent
                    }
                },
                'at': {
                    "1": {
                        content: dummyContent
                    },
                    "2": {
                        content: dummyContent
                    },
                    "3": {
                        content: dummyContent
                    },
                    "4": {
                        content: dummyContent
                    }
                }
            },
            'cv': {
                'sk': {
                    title: 'CV',
                    content: dummyContent
                },
                'at': {
                    title: 'CV',
                    content: dummyContent
                }
            },
            'contact': {
                'sk': {
                    title: 'Kontakt',
                    content: dummyContent
                },
                'at': {
                    title: 'Kontakt',
                    content: dummyContent
                }
            }
        }
    });
