$(function () {
    var editor = ace.edit('editor');
    editor.setTheme('ace/theme/monokai');
    editor.getSession().setMode('ace/mode/javascript');

    var input = ace.edit('input');
    input.setTheme('ace/theme/vibrant_ink');

    var output = ace.edit('output');
    output.setTheme('ace/theme/merbivore');
    output.setReadOnly(true);
    output.$blockScrolling = Infinity;

    var $run = $('#run');

    $run.on('click keydown', run);

    function print(text) {
        var session = output.getSession();
        session.insert({
            row: session.getLength(),
            column: 0
        }, String(text));
    }

    function println(text) {
        print(text);
        print('\n');
    }

    function run() {
        var lines = input.getValue().split('\n');
        output.setValue('');

        try {
            eval(editor.getValue());    // Yeah, I know ...
            main(lines);
        } catch (err) {
            output.setValue(err.stack, -1);
        }
    }
});
