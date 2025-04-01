"use client";
"use strict";
exports.__esModule = true;
exports.GoogleAuthButton = exports.GitHubAuthButton = exports.SubmitButton = void 0;
var button_1 = require("@/components/ui/button");
var utils_1 = require("@/lib/utils");
var lucide_react_1 = require("lucide-react");
var image_1 = require("next/image");
var react_dom_1 = require("react-dom");
var github_svg_1 = require("@/public/github.svg");
var google_svg_1 = require("@/public/google.svg");
function SubmitButton(_a) {
    var text = _a.text, variant = _a.variant, className = _a.className;
    var pending = react_dom_1.useFormStatus().pending;
    return (React.createElement(React.Fragment, null, pending ? (React.createElement(button_1.Button, { disabled: true, variant: "outline", className: utils_1.cn("w-fit", className) },
        React.createElement(lucide_react_1.Loader2, { className: "size-4 mr-2 animate-spin" }),
        " Please wait")) : (React.createElement(button_1.Button, { variant: variant, type: "submit", className: utils_1.cn("w-fit", className) }, text))));
}
exports.SubmitButton = SubmitButton;
function GitHubAuthButton() {
    var pending = react_dom_1.useFormStatus().pending;
    return (React.createElement(React.Fragment, null, pending ? (React.createElement(button_1.Button, { variant: "outline", className: "w-full", disabled: true },
        React.createElement(lucide_react_1.Loader2, { className: "size-4 mr-2 animate-spin" }),
        " Please wait")) : (React.createElement(button_1.Button, { variant: "outline", className: "w-full" },
        React.createElement(image_1["default"], { src: github_svg_1["default"], className: "size-4 mr-2 dark:invert", alt: "Google Logo" }),
        "Sign in with GitHub"))));
}
exports.GitHubAuthButton = GitHubAuthButton;
function GoogleAuthButton() {
    var pending = react_dom_1.useFormStatus().pending;
    return (React.createElement(React.Fragment, null, pending ? (React.createElement(button_1.Button, { variant: "outline", className: "w-full", disabled: true },
        React.createElement(lucide_react_1.Loader2, { className: "size-4 mr-2 animate-spin" }),
        " Please wait")) : (React.createElement(button_1.Button, { variant: "outline", className: "w-full" },
        React.createElement(image_1["default"], { src: google_svg_1["default"], className: "size-4 mr-2", alt: "Google Logo" }),
        "Sign in with Google"))));
}
exports.GoogleAuthButton = GoogleAuthButton;
