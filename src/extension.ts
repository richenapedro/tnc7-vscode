import * as vscode from "vscode";

type MDoc = { title: string; function: string; purpose: string; source: string };

/**
 * M-functions from the HEIDENHAIN TNC7 basic User's Manual (10/2023),
 * as provided by the user in chat.
 *
 * IMPORTANT:
 * - If an M-code also exists in the local macro set (M_DOC), we keep the local description.
 *   (Local entries override manual entries.)
 */
const MANUAL_M_DOC: Record<number, MDoc> = {
  0: {
    title: "M0",
    function: "Stop program run, stop spindle, coolant off",
    purpose: "Stops program execution and the spindle, and switches the coolant supply off.",
    source: "HEIDENHAIN TNC7 basic User's Manual (10/2023)"
  },
  1: {
    title: "M1",
    function: "Optional stop (machine-dependent)",
    purpose:
      "Optionally stops program run, optionally stops the spindle, and optionally switches the coolant supply off. Behavior depends on the machine manufacturer.",
    source: "HEIDENHAIN TNC7 basic User's Manual (10/2023)"
  },
  2: {
    title: "M2",
    function: "Stop, return to program start (machine-dependent reset)",
    purpose:
      "Stops program execution and the spindle, switches the coolant supply off, returns to the beginning of the program, and can optionally reset program information. Behavior depends on machine parameter resetAt (No. 100901).",
    source: "HEIDENHAIN TNC7 basic User's Manual (10/2023)"
  },
  3: {
    title: "M3",
    function: "Spindle on clockwise",
    purpose: "Switches the spindle on clockwise.",
    source: "HEIDENHAIN TNC7 basic User's Manual (10/2023)"
  },
  4: {
    title: "M4",
    function: "Spindle on counterclockwise",
    purpose: "Switches the spindle on counterclockwise.",
    source: "HEIDENHAIN TNC7 basic User's Manual (10/2023)"
  },
  5: {
    title: "M5",
    function: "Spindle stop",
    purpose: "Stops the spindle.",
    source: "HEIDENHAIN TNC7 basic User's Manual (10/2023)"
  },
  8: {
    title: "M8",
    function: "Coolant on",
    purpose: "Switches the coolant supply on.",
    source: "HEIDENHAIN TNC7 basic User's Manual (10/2023)"
  },
  9: {
    title: "M9",
    function: "Coolant off",
    purpose: "Switches the coolant supply off.",
    source: "HEIDENHAIN TNC7 basic User's Manual (10/2023)"
  },
  30: {
    title: "M30",
    function: "Identical to M2",
    purpose: "Function is identical to M2 (stop, coolant off, return to program start; machine-dependent reset behavior).",
    source: "HEIDENHAIN TNC7 basic User's Manual (10/2023)"
  },
  89: {
    title: "M89",
    function: "Call the cycle modally",
    purpose: "Calls the cycle modally.",
    source: "HEIDENHAIN TNC7 basic User's Manual (10/2023)"
  },

  92: {
    title: "M92",
    function: "Traverse in the M92 coordinate system",
    purpose: "Traverses in the M92 coordinate system.",
    source: "HEIDENHAIN TNC7 basic User's Manual (10/2023)"
  },
  94: {
    title: "M94",
    function: "Reduce rotary axis display to < 360°",
    purpose: "Reduces the display for rotary axes to under 360°.",
    source: "HEIDENHAIN TNC7 basic User's Manual (10/2023)"
  },
  97: {
    title: "M97",
    function: "Machine small contour steps",
    purpose: "Machines small contour steps.",
    source: "HEIDENHAIN TNC7 basic User's Manual (10/2023)"
  },
  98: {
    title: "M98",
    function: "Machine open contours completely",
    purpose: "Machines open contours completely.",
    source: "HEIDENHAIN TNC7 basic User's Manual (10/2023)"
  },
  99: {
    title: "M99",
    function: "Call a cycle once per block",
    purpose: "Calls a cycle once per block.",
    source: "HEIDENHAIN TNC7 basic User's Manual (10/2023)"
  },

  101: {
    title: "M101",
    function: "Automatically insert a replacement tool",
    purpose: "Automatically inserts a replacement tool.",
    source: "HEIDENHAIN TNC7 basic User's Manual (10/2023)"
  },
  102: {
    title: "M102",
    function: "Reset M101",
    purpose: "Resets M101.",
    source: "HEIDENHAIN TNC7 basic User's Manual (10/2023)"
  },

  103: {
    title: "M103",
    function: "Reduce feed rate for infeed movements",
    purpose: "Reduces the feed rate for infeed movements.",
    source: "HEIDENHAIN TNC7 basic User's Manual (10/2023)"
  },

  107: {
    title: "M107",
    function: "Permit positive tool oversizes",
    purpose: "Permits positive tool oversizes.",
    source: "HEIDENHAIN TNC7 basic User's Manual (10/2023)"
  },
  108: {
    title: "M108",
    function: "Check radius of replacement tool; reset M107",
    purpose: "Checks the radius of the replacement tool and resets M107.",
    source: "HEIDENHAIN TNC7 basic User's Manual (10/2023)"
  },

  109: {
    title: "M109",
    function: "Adapt feed rate for circular paths",
    purpose: "Adapts the feed rate for circular paths.",
    source: "HEIDENHAIN TNC7 basic User's Manual (10/2023)"
  },
  110: {
    title: "M110",
    function: "Reduce feed rate for inner radii",
    purpose: "Reduces the feed rate for inner radii.",
    source: "HEIDENHAIN TNC7 basic User's Manual (10/2023)"
  },
  111: {
    title: "M111",
    function: "Reset M109 and M110",
    purpose: "Resets M109 and M110.",
    source: "HEIDENHAIN TNC7 basic User's Manual (10/2023)"
  },

  116: {
    title: "M116",
    function: "Interpret rotary axis feed rate as mm/min",
    purpose: "Interprets feed rate for rotary axes as mm/min.",
    source: "HEIDENHAIN TNC7 basic User's Manual (10/2023)"
  },
  117: {
    title: "M117",
    function: "Reset M116",
    purpose: "Resets M116.",
    source: "HEIDENHAIN TNC7 basic User's Manual (10/2023)"
  },

  118: {
    title: "M118",
    function: "Activate handwheel superimpositioning",
    purpose: "Activates handwheel superimpositioning.",
    source: "HEIDENHAIN TNC7 basic User's Manual (10/2023)"
  },

  120: {
    title: "M120",
    function: "Look-ahead for radius compensation",
    purpose: "Pre-calculates the radius-compensated contour (look-ahead).",
    source: "HEIDENHAIN TNC7 basic User's Manual (10/2023)"
  },

  126: {
    title: "M126",
    function: "Shorter-path traverse of rotary axes",
    purpose: "Enables shorter-path traverse of rotary axes.",
    source: "HEIDENHAIN TNC7 basic User's Manual (10/2023)"
  },
  127: {
    title: "M127",
    function: "Reset M126",
    purpose: "Resets M126.",
    source: "HEIDENHAIN TNC7 basic User's Manual (10/2023)"
  },

  128: {
    title: "M128",
    function: "Automatically compensate tool inclination (TCPM)",
    purpose: "Automatically compensates for tool inclination (TCPM).",
    source: "HEIDENHAIN TNC7 basic User's Manual (10/2023)"
  },
  129: {
    title: "M129",
    function: "Reset M128",
    purpose: "Resets M128.",
    source: "HEIDENHAIN TNC7 basic User's Manual (10/2023)"
  },

  130: {
    title: "M130",
    function: "Traverse in the non-tilted input coordinate system (I-CS)",
    purpose: "Traverses in the non-tilted input coordinate system (I-CS).",
    source: "HEIDENHAIN TNC7 basic User's Manual (10/2023)"
  },

  136: {
    title: "M136",
    function: "Interpret feed rate as mm/rev",
    purpose: "Interprets feed rate as mm/rev.",
    source: "HEIDENHAIN TNC7 basic User's Manual (10/2023)"
  },
  137: {
    title: "M137",
    function: "Reset M136",
    purpose: "Resets M136.",
    source: "HEIDENHAIN TNC7 basic User's Manual (10/2023)"
  },

  138: {
    title: "M138",
    function: "Include rotary axes during machining operations",
    purpose: "Takes rotary axes into account during machining operations.",
    source: "HEIDENHAIN TNC7 basic User's Manual (10/2023)"
  },

  140: {
    title: "M140",
    function: "Retract in the tool axis",
    purpose: "Retracts in the tool axis.",
    source: "HEIDENHAIN TNC7 basic User's Manual (10/2023)"
  },

  141: {
    title: "M141",
    function: "Suppress touch probe monitoring",
    purpose: "Suppresses touch probe monitoring.",
    source: "HEIDENHAIN TNC7 basic User's Manual (10/2023)"
  },

  143: {
    title: "M143",
    function: "Rescind basic rotations",
    purpose: "Rescinds basic rotations.",
    source: "HEIDENHAIN TNC7 basic User's Manual (10/2023)"
  },

  144: {
    title: "M144",
    function: "Factor tool offset into calculations",
    purpose: "Factors the tool offset into the calculations.",
    source: "HEIDENHAIN TNC7 basic User's Manual (10/2023)"
  },
  145: {
    title: "M145",
    function: "Reset M144",
    purpose: "Resets M144.",
    source: "HEIDENHAIN TNC7 basic User's Manual (10/2023)"
  },

  148: {
    title: "M148",
    function: "Auto lift-off on NC stop / power failure",
    purpose: "Automatically lifts off upon an NC stop or a power failure.",
    source: "HEIDENHAIN TNC7 basic User's Manual (10/2023)"
  },
  149: {
    title: "M149",
    function: "Reset M148",
    purpose: "Resets M148.",
    source: "HEIDENHAIN TNC7 basic User's Manual (10/2023)"
  },

  197: {
    title: "M197",
    function: "Prevent rounding off outside corners",
    purpose: "Prevents rounding off of outside corners.",
    source: "HEIDENHAIN TNC7 basic User's Manual (10/2023)"
  }
};

const M_DOC: Record<number, MDoc> = {
  13: {
    title: "M13",
    function: "Spindle CW + coolant on",
    purpose: "Runs M3 (spindle clockwise) and M8 (coolant on).",
    source: "M13.h"
  },
  14: {
    title: "M14",
    function: "Spindle CCW + coolant on",
    purpose: "Runs M4 (spindle counter-clockwise) and M8 (coolant on).",
    source: "M14.h"
  },
  25: {
    title: "M25",
    function: "Machine home/ready position program",
    purpose: "Reference/ready-position program for Gx52/G150/Gx50a (TNC640) including forced A-axis motion (as noted in header).",
    source: "M25.H"
  },

  26: { title: "M26", function: "Spindle stop + coolant off", purpose: "Stops spindle (M5) and turns coolant off (M9).", source: "M26.h" },
  27: { title: "M27", function: "Coolant off", purpose: "Turns coolant off (M9).", source: "M27.h" },

  40: { title: "M40", function: "Machine-specific macro", purpose: "Macro program M40 (no explicit header description found).", source: "M40.h" },
  47: { title: "M47", function: "Machine-specific macro", purpose: "Macro program M47 (no explicit header description found).", source: "M47.h" },
  48: { title: "M48", function: "Machine-specific macro", purpose: "Macro program M48 (no explicit header description found).", source: "M48.h" },

  55: { title: "M55", function: "Clean program (variant)", purpose: "Clean program macro (variant).", source: "M55.h" },
  60: { title: "M60", function: "Machine-specific macro", purpose: "Macro program M60 (no explicit header description found).", source: "M60.h" },

  69: { title: "M69", function: "Machine-specific macro", purpose: "Macro sets/clears the active NC macro number in PLC (WG_Nummer_aktives_NC_Macro).", source: "M69.h" },
  70: { title: "M70", function: "Machine-specific macro", purpose: "Macro sets/clears the active NC macro number in PLC (WG_Nummer_aktives_NC_Macro).", source: "M70.h" },

  71: { title: "M71", function: "PLC trigger (99992) parameter 0", purpose: "Triggers PLC function via FN 29: PLC = +99992 / +0 / +0.", source: "M71.h" },
  72: { title: "M72", function: "Activate limit set 'Limit2'", purpose: "Writes ID300 parameters to enable limit set 'Limit2'.", source: "M72.h" },
  73: { title: "M73", function: "PLC trigger (99992) parameter 1", purpose: "Triggers PLC function via FN 29: PLC = +99992 / +0 / +1.", source: "M73.h" },

  77: { title: "M77", function: "Start timer 0", purpose: "Calls TNC:\\GROB\\AWT\\TIMER\\G_TIMER_0.H.", source: "M77.H" },
  78: { title: "M78", function: "Start timer 1", purpose: "Calls TNC:\\GROB\\AWT\\TIMER\\G_TIMER_1.H.", source: "M78.H" },

  289: { title: "M289", function: "Machine-specific macro", purpose: "Macro program M289 (no explicit header description found).", source: "M289.h" },

  328: { title: "M328", function: "Machine-specific macro", purpose: "Macro program M328 (no explicit header description found).", source: "M328.h" },

  340: { title: "M340", function: "Clean program", purpose: "This macro performs a clean program.", source: "M340.h" },
  341: { title: "M341", function: "Machine-specific macro", purpose: "Macro program M341 (no explicit header description found).", source: "M341.h" },
  342: { title: "M342", function: "Machine-specific macro", purpose: "Macro program M342 (no explicit header description found).", source: "M342.h" },

  343: { title: "M343", function: "Spindle run-in cycle (oil-air lubricated spindle)", purpose: "Run-in cycle for oil-air lubricated spindle after standstill > 4 hours. Typical runtime ~8 minutes.", source: "M343.h" },
  344: { title: "M344", function: "Spindle run-in cycle (oil-air lubricated spindle)", purpose: "Run-in cycle for oil-air lubricated spindle after standstill > 3 days. Typical runtime ~26 minutes.", source: "M344.h" },
  345: { title: "M345", function: "Spindle run-in cycle (oil-air lubricated spindle)", purpose: "Run-in cycle for oil-air lubricated spindle after standstill > 4 weeks. Typical runtime ~90 minutes.", source: "M345.h" },
  346: { title: "M346", function: "Spindle run-in cycle (oil-air lubricated spindle)", purpose: "Run-in cycle for oil-air lubricated spindle after standstill > 6 months. Typical runtime ~240 minutes.", source: "M346.h" },

  347: { title: "M347", function: "Machine-specific macro", purpose: "Macro program M347 (no explicit header description found).", source: "M347.h" },
  348: { title: "M348", function: "Machine-specific macro", purpose: "Macro program M348 (no explicit header description found).", source: "M348.h" },

  420: { title: "M420", function: "Machine-specific macro", purpose: "Macro program M420 (no explicit header description found).", source: "M420.H" },
  421: { title: "M421", function: "Machine-specific macro", purpose: "Macro program M421 (no explicit header description found).", source: "M421.H" },

  // User M-function wrappers (440..459)
  440: { title: "M440", function: "User M-function wrapper", purpose: "Wrapper macro: calls TNC:\\system\\mfunct\\M440.H (user-defined M-function) if enabled.", source: "M440.h" },
  441: { title: "M441", function: "User M-function wrapper", purpose: "Wrapper macro: calls TNC:\\system\\mfunct\\M441.H (user-defined M-function) if enabled.", source: "M441.h" },
  442: { title: "M442", function: "User M-function wrapper", purpose: "Wrapper macro: calls TNC:\\system\\mfunct\\M442.H (user-defined M-function) if enabled.", source: "M442.h" },
  443: { title: "M443", function: "User M-function wrapper", purpose: "Wrapper macro: calls TNC:\\system\\mfunct\\M443.H (user-defined M-function) if enabled.", source: "M443.h" },
  444: { title: "M444", function: "User M-function wrapper", purpose: "Wrapper macro: calls TNC:\\system\\mfunct\\M444.H (user-defined M-function) if enabled.", source: "M444.h" },
  445: { title: "M445", function: "User M-function wrapper", purpose: "Wrapper macro: calls TNC:\\system\\mfunct\\M445.H (user-defined M-function) if enabled.", source: "M445.h" },
  446: { title: "M446", function: "User M-function wrapper", purpose: "Wrapper macro: calls TNC:\\system\\mfunct\\M446.H (user-defined M-function) if enabled.", source: "M446.h" },
  447: { title: "M447", function: "User M-function wrapper", purpose: "Wrapper macro: calls TNC:\\system\\mfunct\\M447.H (user-defined M-function) if enabled.", source: "M447.h" },
  448: { title: "M448", function: "User M-function wrapper", purpose: "Wrapper macro: calls TNC:\\system\\mfunct\\M448.H (user-defined M-function) if enabled.", source: "M448.h" },
  449: { title: "M449", function: "User M-function wrapper", purpose: "Wrapper macro: calls TNC:\\system\\mfunct\\M449.H (user-defined M-function) if enabled.", source: "M449.h" },
  450: { title: "M450", function: "User M-function wrapper", purpose: "Wrapper macro: calls TNC:\\system\\mfunct\\M450.H (user-defined M-function) if enabled.", source: "M450.h" },
  451: { title: "M451", function: "User M-function wrapper", purpose: "Wrapper macro: calls TNC:\\system\\mfunct\\M451.H (user-defined M-function) if enabled.", source: "M451.h" },
  452: { title: "M452", function: "User M-function wrapper", purpose: "Wrapper macro: calls TNC:\\system\\mfunct\\M452.H (user-defined M-function) if enabled.", source: "M452.h" },
  453: { title: "M453", function: "User M-function wrapper", purpose: "Wrapper macro: calls TNC:\\system\\mfunct\\M453.H (user-defined M-function) if enabled.", source: "M453.h" },
  454: { title: "M454", function: "User M-function wrapper", purpose: "Wrapper macro: calls TNC:\\system\\mfunct\\M454.H (user-defined M-function) if enabled.", source: "M454.h" },
  455: { title: "M455", function: "User M-function wrapper", purpose: "Wrapper macro: calls TNC:\\system\\mfunct\\M455.H (user-defined M-function) if enabled.", source: "M455.h" },
  456: { title: "M456", function: "User M-function wrapper", purpose: "Wrapper macro: calls TNC:\\system\\mfunct\\M456.H (user-defined M-function) if enabled.", source: "M456.h" },
  457: { title: "M457", function: "User M-function wrapper", purpose: "Wrapper macro: calls TNC:\\system\\mfunct\\M457.H (user-defined M-function) if enabled.", source: "M457.h" },
  458: { title: "M458", function: "User M-function wrapper", purpose: "Wrapper macro: calls TNC:\\system\\mfunct\\M458.H (user-defined M-function) if enabled.", source: "M458.h" },
  459: { title: "M459", function: "User M-function wrapper", purpose: "Wrapper macro: calls TNC:\\system\\mfunct\\M459.H (user-defined M-function) if enabled.", source: "M459.h" },

  503: { title: "M503", function: "Machine-specific macro", purpose: "No description available in this macro set.", source: "" },
  504: { title: "M504", function: "Machine-specific macro", purpose: "No description available in this macro set.", source: "" },
  513: { title: "M513", function: "M503 + coolant on", purpose: "Runs M503 then M8 (coolant on).", source: "M513.h" },
  514: { title: "M514", function: "M504 + coolant on", purpose: "Runs M504 then M8 (coolant on).", source: "M514.h" }
};

// Merge docs: manual first, local macro set second (local wins on duplicates)
const ALL_M_DOC: Record<number, MDoc> = { ...MANUAL_M_DOC, ...M_DOC };

function renumberText(fullText: string): string {
  const lines = fullText.split(/\r?\n/);
  const out = lines.map((line, idx) => {
    const stripped = line.replace(/^\s*\d+\s+/, "");
    return `${idx} ${stripped}`;
  });
  return out.join("\n");
}

function buildMHover(code: number): vscode.Hover | null {
  const doc = ALL_M_DOC[code];
  if (!doc) return null;

  const md = new vscode.MarkdownString(undefined, true);
  md.isTrusted = false;

  md.appendMarkdown(`**${doc.title}**\n\n`);
  if (doc.function) md.appendMarkdown(`- **Function:** ${doc.function}\n`);
  if (doc.purpose) md.appendMarkdown(`- **Description:** ${doc.purpose}\n`);
  if (doc.source) md.appendMarkdown(`- **Source:** \`${doc.source}\`\n`);

  return new vscode.Hover(md);
}

export function activate(context: vscode.ExtensionContext) {
  const renumberCmd = vscode.commands.registerCommand("tnc7.renumber", async () => {
    const editor = vscode.window.activeTextEditor;
    if (!editor) return;
    if (editor.document.languageId !== "tnc7h") return;

    const doc = editor.document;
    const fullRange = new vscode.Range(doc.positionAt(0), doc.positionAt(doc.getText().length));
    const newText = renumberText(doc.getText());

    await editor.edit((editBuilder) => editBuilder.replace(fullRange, newText));
  });

  const formatter = vscode.languages.registerDocumentFormattingEditProvider("tnc7h", {
    provideDocumentFormattingEdits(document: vscode.TextDocument) {
      const newText = renumberText(document.getText());
      const fullRange = new vscode.Range(document.positionAt(0), document.positionAt(document.getText().length));
      return [vscode.TextEdit.replace(fullRange, newText)];
    }
  });

  const hoverProvider = vscode.languages.registerHoverProvider("tnc7h", {
    provideHover(document, position) {
      const range = document.getWordRangeAtPosition(position, /\bM\d{1,4}\b/);
      if (!range) return;

      const word = document.getText(range);
      const m = /^M(\d{1,4})$/.exec(word);
      if (!m) return;

      const code = Number(m[1]);
      return (
        buildMHover(code) ??
        new vscode.Hover(new vscode.MarkdownString(`**M${code}**\n\nNo description available in this macro set.`))
      );
    }
  });

  context.subscriptions.push(renumberCmd, formatter, hoverProvider);
}

export function deactivate() {}
