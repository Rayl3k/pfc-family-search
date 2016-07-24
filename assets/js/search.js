// Global variables to manage the search
var start, count, params;
var resultsLength = 15;
var context = "";

// ======================================== //
// ********** OBJECT TREATMENT **********
// ======================================== //
// Function to iterate over an object parameters
var forEach = function(obj, iterator, context) {
    if (obj == null) { // also catches undefined
        return;
    }
    if (Array.prototype.forEach && obj.forEach === Array.prototype.forEach) {
        obj.forEach(iterator, context);
    } else if (obj.length === +obj.length) {
        for (var i = 0, length = obj.length; i < length; i++) {
            if (iterator.call(context, obj[i], i, obj) === {}) {
                return;
            }
        }
    } else {
        for (var key in obj) {
            if (obj.hasOwnProperty(key)) {
                if (iterator.call(context, obj[key], key, obj) === {}) {
                    return;
                }
            }
        }
    }
};

// Remove empty properties from objects
function removeEmptyProperties(obj) {
    forEach(obj, function(value, key) {
        if ((value == null || value === '')) {  // == null also catches undefined
            delete obj[key];
        }
    });
    return obj;
};

// ======================================== //
// ****** PANELS & TABLES CREATOR ********
// ======================================== //
// Create table for main display properties
function personDisplayProperties(person) {

    var displayProperties = createPanelTable('Display information', [
        [
            ['th', 'ID'],
            ['th', 'Gender'],
            ['th', 'Lifespan'],
            ['th', 'Living']
        ],
        [
            ['td', person.getId()],
            ['td', person.getDisplayGender()],
            ['td', person.getDisplayLifeSpan()],
            ['td', person.isLiving()]
        ],
        [
            ['th', 'Birth Date'],
            ['th', 'Birth Place'],
            ['th', 'Death Date'],
            ['th', 'Death Place']
        ],
        [
            ['td', person.getDisplayBirthDate()],
            ['td', person.getDisplayBirthPlace()],
            ['td', person.getDisplayDeathDate()],
            ['td', person.getDisplayDeathPlace()]
        ]
    ]);

    // Print
    if(person) {
        displayProperties.appendTo('#display-information');
        $('#disclaimer-display').hide();
    }
}

// Create table for names
function personDisplayNames(names) {
    // Create an entry per each name
    for(var i = 0; i < names.length; i++) {
        var name = names[i];
        var header = '<code>' + name.getType() + '</code>';
        if(name.isPreferred()) header += ' <span class="label label-success">Preferred</span>';

        var rowNames = [
            [
                ['th', 'Full Text'],
                ['th', 'Given Name'],
                ['th', 'Surname'],
                ['th', 'Lang']
            ]
        ];

        for(var j = 0; j < name.getNameFormsCount(); j++) {
            rowNames.push([
                ['td', name.getFullText(j)],
                ['td', name.getGivenName(j)],
                ['td', name.getSurname(j)],
                ['td', name.getLang(j)]
            ]);
        }

        // append pannel table
        if(names.length > 0) {
            createPanelTable(header, rowNames).appendTo('#table-names');
            $('#disclaimer-names').hide();
        }
    }
}

// Crate tables for facts
function personDisplayFacts(facts) {
    // Create an entry per each fact
    for(var i = 0; i < facts.length; i++) {
        var fact = facts[i];
        var header = '<code>' + fact.getType() + '</code>';
        if(fact.isCustomNonEvent()) header += '<span class="label label-info">Event</span>';
        else header += '<span class="label label-info">Fact</span>';

        var x = createPanelTable(header, [
            [
                ['th', 'Place - Original'],
                ['th', 'Place - Normalized'],
                ['th', 'Place - Normalized ID']
            ],
            [
                ['td', fact.getOriginalPlace()],
                ['td', fact.getNormalizedPlace()],
                ['td', fact.getNormalizedPlaceId()]
            ],
            [
                ['th', 'Date - Original'],
                ['th', 'Date - Formal'],
                ['th', 'Place - Normalized']
            ],
            [
                ['td', fact.getOriginalDate()],
                ['td', fact.getFormalDate()],
                ['td', fact.getNormalizedDate()]
            ],
            [
                ['th', 'Description'],
                ['th', ''],
                ['th', '']
            ],
            [
                ['td', fact.getValue()],
                ['td', ''],
                ['td', '']
            ]

        ]).appendTo($('#table-facts'));
    }

    // Hide error message
    if(facts.length > 0) {
        $('#disclaimer-facts').hide();
    }
}

// Create parent tables
function personDisplayParents(response, person) {
    var parentRelationships = response.getParentRelationships();
    for(var i = 0; i < parentRelationships.length; i++) {
        var relationship = parentRelationships[i];
        var father = response.getPerson(relationship.getFatherId());
        var mother = response.getPerson(relationship.getMotherId());

        createPanelTable('Parents Relationship: ' + (i+1), [
            [
                ['th', 'Father'],
                ['th', 'Mother'],
                ['th', 'Child']
            ],
            [
                ['td', father ? father.getId() : ''],
                ['td', mother ? mother.getId() : ''],
                ['td', person ? person.getId() : '']
            ],
            [
                ['td', father ? father.getDisplayName() : ''],
                ['td', mother ? mother.getDisplayName() : ''],
                ['td', person ? person.getDisplayName() : '']
            ],
            [
                ['td', father ? father.getDisplayLifeSpan() : ''],
                ['td', mother ? mother.getDisplayLifeSpan() : ''],
                ['td', person ? person.getDisplayLifeSpan() : '']
            ]
        ]).appendTo($('#table-parents'));
    }

    // Hide error
    if(parentRelationships.length > 0) {
        $('#disclaimer-parents').hide();
    }
}

// Create spouse tables
function personDisplaySpouse(response, person) {
    var spouseRelationships = response.getSpouseRelationships();
    for(var i = 0; i < spouseRelationships.length; i++) {
        var relationship = spouseRelationships[i];
        var spouse = response.getPerson(relationship.getSpouseId(person.getId()));

        createPanelTable('Couple Relationship: ' + (i+1), [
            [
                ['th', 'Relationship ID'],
                ['th', 'Person'],
                ['th', 'Spouse']
            ],
            [
                ['td', relationship ? relationship.getId() : ''],
                ['td', person ? person.getId() : ''],
                ['td', spouse ? spouse.getId() : '']
            ],
            [
                ['td', ''],
                ['td', person ? person.getDisplayName() : ''],
                ['td', spouse ? spouse.getDisplayName() : '']
            ],
            [
                ['td', ''],
                ['td', person ? person.getDisplayLifeSpan() : ''],
                ['td', spouse ? spouse.getDisplayLifeSpan() : '']
            ]
        ]).appendTo($('#table-spouse'));
    }

    // Hide error
    if(spouseRelationships.length > 0) {
        $('#disclaimer-spouse').hide();
    }
}

// Create children tables
function personDisplayChildren(response, person) {
    var childrenRelationships = response.getChildRelationships();
    for(var i = 0; i < childrenRelationships.length; i++) {
        var relationship = childrenRelationships[i];
        var child = response.getPerson(relationship.getChildId());
        var father = response.getPerson(relationship.getFatherId());
        var mother = response.getPerson(relationship.getMotherId());

        createPanelTable('Children of Couple: ' + (i+1), [
            [
                ['th', 'Child'],
                ['th', 'Father'],
                ['th', 'Mother']
            ],
            [
                ['td', person ? child.getId() : ''],
                ['td', father ? father.getId() : ''],
                ['td', mother ? mother.getId() : '']
            ],
            [
                ['td', person ? child.getDisplayName() : ''],
                ['td', father ? father.getDisplayName() : ''],
                ['td', mother ? mother.getDisplayName() : '']
            ],
            [
                ['td', person ? child.getDisplayLifeSpan() : ''],
                ['td', father ? father.getDisplayLifeSpan() : ''],
                ['td', mother ? mother.getDisplayLifeSpan() : '']
            ]
        ]).appendTo($('#table-children'));
    }

    // Hide Error
    if(childrenRelationships.length > 0) {
        $('#disclaimer-children').hide();
    }
}

// Create ancestry table
function personDisplayAncestry(ancestry) {
    // Initial variables
    var header = 'Ascendency in Ahnentafel numbers';
    var rows = [
        [
            ['th', 'Anhentafel #'],
            ['th', 'ID'],
            ['th', 'Name']
        ]
    ];

    // Asked for max generations 8 so max: 255
    for(var i = 1; i <= 255; i++) {
        if(ancestry.exists(i)) {
            var person = ancestry.getPerson(i);
            rows.push([
                ['td', person ? person.getAscendancyNumber() : ''],
                ['td', person ? person.getId() : ''],
                ['td', person ? person.getDisplayName() : '']
            ]);
        }
    }

    if(rows.length > 1) {
        $('#disclaimer-ancestry').hide();
        createPanelTable(header, rows).appendTo($('#table-ancestry'));
    }
}

// Create descendancy table
function personDisplayDescendancy(descendancy) {
    // Initial variables
    var header = 'Descendancy in Aboville System';
    var rows = [
        [
            ['th', 'Aboville #'],
            ['th', 'ID'],
            ['th', 'Name']
        ]
    ];

    // Get main person
    var person = descendancy.getPerson(1);
    rows.push([
        ['td', person ? person.getDescendancyNumber() : ''],
        ['td', person ? person.getId() : ''],
        ['td', person ? person.getDisplayName() : '']
    ]);

    // We've asked for two descendancy generations and we will set max 10 children per peson
    for(var i = 1; i <= 10; i++) {
        var aboville = 1 + '.' + i;
        // Get descendancy of descendancy
        if(descendancy.exists(aboville)) {
            // Print child of person
            person = descendancy.getPerson(aboville);
            rows.push([
                ['td', aboville],
                ['td', person ? person.getId() : ''],
                ['td', person ? person.getDisplayName() : '']
            ]);

            // Print children of child
            for(var j = 1; j <= 10; j++) {
                var aboville2 = aboville + '.' + j;
                if(descendancy.exists(aboville2)) {
                    person = descendancy.getPerson(aboville2);
                    rows.push([
                        ['td', aboville2],
                        ['td', person ? person.getId() : ''],
                        ['td', person ? person.getDisplayName() : '']
                    ]);
                }
            }
        }
    }

    // Add rows and print
    if(rows.length > 1) {
        $('#disclaimer-descendancy').hide();
        createPanelTable(header, rows).appendTo($('#table-descendancy'));
    }
}

// Create panel changes
function personDisplayChanges(changes) {
    // Initialize variables
    var header = 'Last changes on person';
    var rows = [
        [
            ['th', 'Title'],
            ['th', 'Agent'],
            ['th', 'Change Reason']
        ]
    ];

    // Get changes details
    var changes = changes.getChanges();
    for(var i = 0; i < changes.length; i++) {
        var change = changes[i];
        rows.push([
            ['td', change.getTitle()],
            ['td', change.getAgentName()],
            ['td', change.getChangeReason()]
        ]);
    }

    // Print changes
    if(changes.length != 0) {
        createPanelTable(header, rows).appendTo($('#table-changes'));

    }

    // Hide error
    if(changes.length > 0) {
        $('#disclaimer-changes').hide();
    }
}

// Create notes table
function personDisplayNotes(notes) {
    // Initialize variables
    var header = 'Notes information';
    var rows = [
        [
            ['th', 'Subject'],
            ['th', 'Text']
        ]
    ];

    // Get notes
    var notes = notes.getNotes();
    for(var i = 0; i < notes.length; i++) {
        var note = notes[i];
        rows.push([
            ['td', note.getSubject()],
            ['td', note.getText()]
        ]);
    }

    // Print changes
    if(notes.length > 0) {
        $('#disclaimer-notes').hide();
        createPanelTable(header, rows).appendTo($('#table-notes'));
    }
}

// Create sources tables
function personDisplaySources(sourcesRef) {
    // Get sources
    var sources = sourcesRef.getSourceRefs();

    // Create box per each sources ref
    for(var i = 0; i < sources.length; i++) {
        var source = sources[i];
        var header = '<code>' + source.getAttachedEntityUrl() + '</code>';
        //var attribution = source.getAttribution().getAgent().getName();
        var rows = [
            [
                ['th', 'Agent'],
                ['th', 'Description']
            ],
            [
                ['td', 'lula'],
                ['td', source.getDescription()]
            ]
        ];

        // Append to table sources
        createPanelTable(header, rows).appendTo($('#table-sources'));
    }

    // Hide error
    if(sources.length > 0) {
        $('#disclaimer-sources').hide();
    }
}

// Create discussions table
function personDisplayDiscussions(discussions) {
    // Initialize variables
    var header = 'Discussions';
    var rows = [
        [
            ['th', 'ID'],
            ['th', 'URL']
        ]
    ];

    // Get Discussions
    var discussions = discussions.getDiscussionRefs();
    for(var i = 0; i < discussions.length; i++) {
        var discussion = discussions[i];
        rows.push([
            [
                ['td', discussion.getId()],
                ['td', discussion.getDiscussionUrl()]
            ]
        ]);
    }

    if(discussions.length > 0) {
        createPanelTable(header, rows).appendTo($('#table-discussions'));
    }
}

// Create panel memories
function personDisplayMemories(memories) {
    // Initialize variables
    var header = 'Discussions';
    var rows = [
        [
            ['th', 'ID'],
            ['th', 'URL']
        ]
    ];

    // Get memories
    var memories = memories.getMemoryPersonaRefs();
    for(var i = 0; i < memories.length; i++) {
        memory = memories[i];
        rows.push([
            [
                ['td', memory.getId()],
                ['td', memory.getMemoryPersonaRefUrl()]
            ]
        ]);
    }

    // Print result
    if(memories.length > 0) {
        createPanelTable(header, rows).appendTo($('#table-memories'));
    }
}

// Create panel tables
function createPanelTable(header, rows){
    // Create pannel and attach header text
    var $panel = $('<div>').addClass('panel panel-default');
    $('<div>').addClass('panel-heading').html(header).appendTo($panel);

    // Create Pannel body
    var $panelBody = $('<div>').addClass('bodyTable').appendTo($panel);

    // Create table
    var $table = $('<table>').addClass('table table-responsive').append('<tbody>').appendTo($panelBody);
    for(var i = 0; i < rows.length; i++){
        var $row = $('<tr>').appendTo($table);
        for(var j = 0; j < rows[i].length; j++){
            $('<'+rows[i][j][0]+'>').text(rows[i][j][1]).appendTo($row);
        }
    }

    return $panel;
}

// Empty specific person content
function emptySpecificPerson() {
    $('#display-information').empty();
    $('#table-names').empty();
    $('#table-facts').empty();
    $('#table-parents').empty();
    $('#table-spouse').empty();
    $('#table-children').empty();
    $('#table-ancestry').empty();
    $('#table-descendancy').empty();
    $('#table-notes').empty();
    $('#table-sources').empty();
    $('#table-changes').empty();
}

// ======================================== //
// ************ PERSON SEARCH  ************
// ======================================== //
function printPersonsToTable(pos) {
    // Update start in params
    params.start = pos;
    params.context = context;

    // Search with the defined parameters
    client.getPersonSearch(params).then(function(searchResponse) {
       // Get parameters
       count = searchResponse.getResultsCount();
       start = searchResponse.getIndex();
       context = searchResponse.getContext();

       // Ensure API errors are not displayed
       $('#api-errors').fadeOut('fast');

       // Log total results and starting point
       console.log("count: " + count + " start: " + start + " context: " + context);

       // Set persons totals
       $('#person-totals').text(" " + count);

        // Initialize table content
        var $table = $('<table>').addClass('table table-hover table-responsive');
        $table.append(
            $('<thead>')
                .append($('<tr>')
                    .append('<th>ID</th>')
                    .append('<th>NAME</th>')
                    .append('<th>BIRTH</th>')
                    .append('<th>DEATH</th>')
                )
            )
            .append($('<tbody>'));

        // Refresh start position and get persons
        start = pos;
        var results = searchResponse.getSearchResults();

        // For each person in results update table
        for(var i = 0; i < results.length; i++){
            var result = results[i],
                person = result.getPrimaryPerson(),
                $row = $('<tr>').addClass('table-body-row').appendTo($table);

                // Get basic variables and add them to row
                var personID = person.getId() != null ? person.getId() : "undefined";
                var displayName = person.getDisplayName() != null ? person.getDisplayName() : "undefined";
                var displayBirth = person.getDisplayBirthDate() != null ? person.getDisplayBirthDate() : "undefined";
                var displayDeath = person.getDisplayDeathDate() != null ? person.getDisplayDeathDate() : "undefined";
                $('<td>').addClass('person-table-id').text(personID).appendTo($row);
                $('<td>').text(displayName).appendTo($row);
                $('<td>').text(displayBirth).appendTo($row);
                $('<td>').text(displayDeath).appendTo($row);
          }

          // Hide loader
          $('#table-loader').fadeOut('fast');

          // Update table controsl content
          $('#persons-block').text(' ' + (pos+1) + '-' + (pos+results.length) + ' ');

          // Update table content
          $('#table-container').fadeOut('fast');
          $('#table-container').empty();
          $('#table-container').append($table);
          $('#table-controls').fadeIn('fast');
          $('#table-container').fadeIn('slow');

          // Enable search button
          $('#person-search-submit').text('Launch person sesarch');
          $('#person-search-submit').removeClass('disabled');
      })
      .catch(function(e) {
          // Print error
          $('#api-error-text').text(e.message);
          $('#api-errors').fadeIn('fast');
          $('#results-trigger').trigger('click');

          // Recover status
          $('#table-loader').fadeOut('fast');

          // Enable search button
          $('#person-search-submit').text('Launch person sesarch');
          $('#person-search-submit').removeClass('disabled');

          // Send ga error
          var error = 'personSearch_error_' + String(e.message).replace(' ', '_').toLowerCase();
          sendEvent('familysearch', 'personSearch', error);
      });
}

// ======================================== //
// ************ DOCUMENT READY ************
// ======================================== //
$( document ).ready(function() {
    // START: Stop focus on button press
    $(".btn").mouseup(function(){
        $(this).blur();
    });

    // Expand/contract searchers
    $('.collapseHeader').click(function () {
        var x = $(this).children('.personHeaderGlyph').children('.glyphicon');
        x.toggleClass('glyph-rotated');
        if(x.hasClass('glyph-rotated')) $(this).children('.personHeaderTitle').children('h3').children('.personHeaderSign').text('-');
        else $(this).children('.personHeaderTitle').children('h3').children('.personHeaderSign').text('+');
    });

    // ======================================== //
    // *** CLICK ON PERSON IN TABLE  ***
    // ======================================== //
    $('#persons-table').on("click", '.table-body-row', function() {
        // Get id of clicked person
        var personID = $(this).children('.person-table-id').html().trim();

        // Clean current contents + reset
        emptySpecificPerson();
        $('.disclaimer').show();

        // Display person being loaded and jump to section
        $('#person-name').text('Loading information...');
        $('#specific-details').hide();
        $('#specific-person').fadeIn('fast');
        $('#specific-loader').fadeIn('fast');
        $('#specific-trigger').trigger('click');

        // Launch the call to get the data and prin it when you get it.
        client.getPersonWithRelationships(personID, {persons: true}).then(function(personResponse) {
            // Ensure API errors are not displayed
            $('#api-errors').fadeOut('fast');
            // Get Main Person and print its data
            var mainPerson = personResponse.getPrimaryPerson();
            // Hide specific loader
            $('#specific-loader').fadeOut('fast');
            // Print name
            $('#person-name').text(mainPerson.getDisplayName() + " details");
            // Show Results
            $('#specific-details').fadeIn('slow');
            // Append display properties
            personDisplayProperties(mainPerson);
            // Display person names
            personDisplayNames(mainPerson.getNames());
            // Display facts
            personDisplayFacts(mainPerson.getFacts());
            // Display parent relationships
            personDisplayParents(personResponse, mainPerson);
            // Display spouse relationships
            personDisplaySpouse(personResponse, mainPerson);
            // Display child relationships
            personDisplayChildren(personResponse, mainPerson);
            // Display person ancestry (255)
            client.getAncestry(mainPerson.getId(), {generations: 8}).then(function(ancestry){
                personDisplayAncestry(ancestry);
            });
            // Display person descendancy (2 generations)
            client.getDescendancy(mainPerson.getId(), {generations: 2}).then(function(descendancy){
                personDisplayDescendancy(descendancy);
            });
            // Display notes related with person
            mainPerson.getNotes().then(function(notes) {
                personDisplayNotes(notes);
            });
            // Display sources
            mainPerson.getSources().then(function(sources) {
                personDisplaySources(sources);
            });
            // Display onGoing Discussions
            /*mainPerson.getDiscussionRefs().then(function(discussions) {
                personDisplayDiscussions(discussions);
            });
            // Display memories
            mainPerson.getMemoryPersonaRefs().then(function(memories) {
                personDisplayMemories(memories);
            });*/
            // Display Person Matches
            // Display changes in person
            mainPerson.getChanges(mainPerson.getId()).then(function(changes) {
                personDisplayChanges(changes);
            });
        })
        // Catch errors
        .catch(function(e) {
            // Print error
            $('#api-error-text').text(e.message);
            $('#api-errors').fadeIn('fast');
            $('#results-trigger').trigger('click');

            // Recover status
            $('#specific-person').fadeOut('fast');
            $('#specific-loader').fadeOut('fast');

            // Send ga error
            var error = 'selectPerson_error_' + String(e.message).replace(' ', '_').toLowerCase();
            sendEvent('familysearch', 'personSearch', error);
        });
    });

    // ======================================== //
    // *** PERSON TABLE CONTROLS  ***
    // ======================================== //
    $('#previous-persons').click(function () {
        var next = (start-resultsLength) > 0 ? (start-resultsLength) : 0;
        if(start != next) printPersonsToTable(next);
    });

    $('#next-persons').click(function () {
        var next = (start+resultsLength) < count ? (start+resultsLength) : start;
        if(start != next) printPersonsToTable(next);
    });

    // ======================================== //
    // *** LAUNCH PERSON SEARCH  ***
    // ======================================== //
    $('#person-search-submit').click(function() {
        // Check current status button and kill if necessary
        if($(this).hasClass('disabled')) throw new FatalError("Can't launch two at the same time!");

        // Diable button
        $(this).text('Searching now...');
        $(this).addClass('disabled');

        // Hide big sections
        $('#table-container').empty(); $('#table-container').hide();
        $('#table-controls').hide();
        $('#specific-person').hide();
        $('#specific-details').hide();

        // Empty current person selection content
        emptySpecificPerson();

        // Ensure that all the displays are shown
        $('.disclaimer').show();

        // Hide errors (1)
        $('#form-errors').addClass('hidden');
        $('#api-errors').fadeOut('fast');

        // Read variables and avoid inejection (no form control needed)
        var mainGender, mainExact, mainName, mainSurname, mainBirthPlace, mainBirthDate, mainDeathPlace, mainDeathDate, mainMarriagePlace, mainMarriageDate;
        var spouseExact, spouseName, spouseSurname, spouseBirthPlace, spouseBirthDate, spouseDeathPlace, spouseDeathDate, spouseMarriagePlace, spouseMarriageDate;
        var fatherExact, fatherName, fatherSurname, fatherBirthPlace, fatherBirthDate, fatherDeathPlace, fatherDeathDate, fatherMarriagePlace, fatherMarriageDate;
        var motherExact, motherName, motherSurname, motherBirthPlace, motherBirthDate, motherDeathPlace, motherDeathDate, motherMarriagePlace, motherMarriageDate;

        // Main person fields
        mainGender = $("input:radio[name ='personGender']:checked").val(); mainExact = $("input:radio[name ='exactInput']:checked").val();
        mainName = escapeHtml($('#givenName').val()); mainSurname = escapeHtml($('#surname').val());
        mainBirthPlace = escapeHtml($('#birthPlace').val()); mainBirthDate = escapeHtml($('#birthDate').val());
        mainDeathPlace = escapeHtml($('#deathPlace').val()); mainDeathDate = escapeHtml($('#deathDate').val());
        mainMarriagePlace = escapeHtml($('#marriagePlace').val()); mainMarriageDate = escapeHtml($('#marriageDate').val());
        // Spouse person fields
        spouseExact = $("input:radio[name ='spouseExactInput']:checked").val();
        spouseName = escapeHtml($('#spouseGivenName').val()); spouseSurname = escapeHtml($('#spouseSurname').val());
        spouseBirthPlace = escapeHtml($('#spouseBirthPlace').val()); spouseBirthDate = escapeHtml($('#spouseBirthDate').val());
        spouseDeathPlace = escapeHtml($('#spouseDeathPlace').val()); spouseDeathDate = escapeHtml($('#spouseDeathDate').val());
        spouseMarriagePlace = escapeHtml($('#spouseMarriagePlace').val()); spouseMarriageDate = escapeHtml($('#spouseMarriageDate').val());
        // Father person fields
        fatherExact = $("input:radio[name ='fatherExactInput']:checked").val();
        fatherName = escapeHtml($('#fatherGivenName').val()); fatherSurname = escapeHtml($('#fatherSurname').val());
        fatherBirthPlace = escapeHtml($('#fatherBirthPlace').val()); fatherBirthDate = escapeHtml($('#fatherBirthDate').val());
        fatherDeathPlace = escapeHtml($('#fatherDeathPlace').val()); fatherDeathDate = escapeHtml($('#fatherDeathDate').val());
        fatherMarriagePlace = escapeHtml($('#fatherMarriagePlace').val()); fatherMarriageDate = escapeHtml($('#fatherMarriageDate').val());
        // Mother person fields
        motherExact = $("input:radio[name ='motherExactInput']:checked").val();
        motherName = escapeHtml($('#motherGivenName').val()); motherSurname = escapeHtml($('#motherSurname').val());
        motherBirthPlace = escapeHtml($('#motherBirthPlace').val()); motherBirthDate = escapeHtml($('#motherBirthDate').val());
        motherDeathPlace = escapeHtml($('#motherDeathPlace').val()); motherDeathDate = escapeHtml($('#motherDeathDate').val());
        motherMarriagePlace = escapeHtml($('#motherMarriagePlace').val()); motherMarriageDate = escapeHtml($('#motherMarriageDate').val());

        var error = 1;
        if(mainName!="" || mainSurname !="" || mainBirthPlace!="" || mainBirthDate!="" || mainDeathPlace!="" || mainDeathDate!="" || mainMarriagePlace!="" || mainMarriageDate!="" ||
           spouseName!="" || spouseSurname !="" || spouseBirthPlace!="" || spouseBirthDate!="" || spouseDeathPlace!="" || spouseDeathDate!="" || spouseMarriagePlace!="" || spouseMarriageDate!="" ||
           fatherName!="" || fatherSurname !="" || fatherBirthPlace!="" || fatherBirthDate!="" || fatherDeathPlace!="" || fatherDeathDate!="" || fatherMarriagePlace!="" || fatherMarriageDate!="" ||
           motherName!="" || motherSurname !="" || motherBirthPlace!="" || motherBirthDate!="" || motherDeathPlace!="" || motherDeathDate!="" || motherMarriagePlace!="" || motherMarriageDate!="") {

               // Set error
               error = 0;
         }

         if(error) {
             // Go to errors
             $('#form-errors').removeClass('hidden');
             $('#error-trigger').trigger('click');

             // Display and hide sections
             $('#results-zone').fadeOut('fast');
             $('#table-loader').hide();

             // Enable search button
             $('#person-search-submit').text('Launch person sesarch');
             $('#person-search-submit').removeClass('disabled');

             // Throw error
             throw new FatalError("We need you to at least select a field!");
         }

         // Dislay loading icon and jump to results
         $('#table-loader').fadeIn('fast');
         $('#results-zone').fadeIn('fast');
         $('#results-trigger').trigger('click');

         // Append tilde if non-exact applies
         if(mainExact != "exactYes") { mainName = mainName + '~'; mainSurname = mainSurname + '~'; }
         if(spouseExact != "exactYes") { spouseName = spouseName + '~'; spouseSurname = spouseSurname + '~'; }
         if(fatherExact != "exactYes") { fatherName = fatherName + '~'; fatherSurname = fatherSurname + '~'; }
         if(motherExact != "exactYes") { motherName = motherName + '~'; motherSurname = motherSurname + '~'; }

         // Populate params variable to get results
         params = {
             start : 0,
             context: '',
             gender : mainGender,
             givenName : mainName,
             surname : mainSurname,
             birthPlace : mainBirthPlace,
             birthDate : mainBirthDate,
             deathPlace : mainDeathPlace,
             deathDate : mainDeathDate,
             marriagePlace : mainMarriagePlace,
             marriageDate : mainMarriageDate,
             spouseName : spouseName,
             spouseSurname : spouseSurname,
             spouseBirthPlace : spouseBirthPlace,
             spouseBirthDate : spouseBirthDate,
             spouseDeathPlace : spouseDeathPlace,
             spouseDeathDate : spouseDeathDate,
             spouseMarriagePlace : spouseMarriagePlace,
             spouseMarriageDate : spouseMarriageDate,
             fatherName : fatherName,
             fatherSurname : fatherSurname,
             fatherBirthPlace : fatherBirthPlace,
             fatherBirthDate : fatherBirthDate,
             fatherDeathPlace : fatherDeathPlace,
             fatherDeathDate : fatherDeathDate,
             fatherMarriagePlace : fatherMarriagePlace,
             fatherMarriageDate : fatherMarriageDate,
             motherName : motherName,
             motherSurname : motherSurname,
             motherBirthPlace : motherBirthPlace,
             motherBirthDate : motherBirthDate,
             motherDeathPlace : motherDeathPlace,
             motherDeathDate : motherDeathDate,
             motherMarriagePlace : motherMarriagePlace,
             motherMarriageDate : motherMarriageDate
         }

         // Remove empty properties and clean context
         params = removeEmptyProperties(params);
         context = '';

         // Send GA event
         var label = 'personSearch_'+(Object.keys(params).length-2);
         sendEvent('familysearch', 'personSearch', label);

         // Print first batch of results
         printPersonsToTable(0);

    });

    // ======================================== //
    // Scroll spy
    // ======================================== //
    $(window).scroll(function() {
        var windowHeight = $(window).height();
        var personSearcher = $("#person-searcher").position().top;
        var fromTop =  $(document).scrollTop();
        var resultsZone = $("#results-container").position().top;

        // current position
        var currentPosition = fromTop+windowHeight;

        // decide if we need to fix the search bar or not
        if(currentPosition >= personSearcher+780) {
            if($("#submit-search").hasClass('detached-bottom')) {
                if(currentPosition >= resultsZone+110) $("#submit-search").toggleClass('detached-bottom', false);
            }
            else {
                if(currentPosition < resultsZone) $("#submit-search").toggleClass('detached-bottom', true);
            }
        }
        else {
            $("#submit-search").toggleClass('detached-bottom', false);
        }
    });

    // ======================================== //
    // Smooth jumping
    // ======================================== //
    $(function() {
        $('a[href*="#"]:not([href="#"])').click(function() {
            if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
                var target = $(this.hash);
                var targetString = String(this.hash.slice(1));
                target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
                if (target.length) {
                    $('html, body').animate({
                        scrollTop: target.offset().top
                    }, 1000);
                    return false;
                }
            }
        });
    });
});
