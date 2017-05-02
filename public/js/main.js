$(function () {
    var EDITOR_KEY = 'jsplay.editor';
    var INPUT_KEY = 'jsplay.input';

    var AUTOSAVE_INTERVAL = 1000;

    var editor = ace.edit('editor');
    editor.setTheme('ace/theme/monokai');
    editor.getSession().setMode('ace/mode/javascript');

    var loadedCode = localStorage.getItem(EDITOR_KEY);
    if (loadedCode) {
        editor.setValue(loadedCode, -1);
    }

    var input = ace.edit('input');
    input.setTheme('ace/theme/vibrant_ink');
    input.setValue(localStorage.getItem(INPUT_KEY) || '', -1);

    var output = ace.edit('output');
    output.setTheme('ace/theme/merbivore');
    output.setReadOnly(true);
    output.$blockScrolling = Infinity;

    $('#run').on('click keydown', run);

    setInterval(autosave, AUTOSAVE_INTERVAL);

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

    function autosave() {
        localStorage.setItem(EDITOR_KEY, editor.getValue());
        localStorage.setItem(INPUT_KEY, input.getValue());
    }
});
