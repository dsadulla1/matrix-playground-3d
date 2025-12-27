// Convert LaTeX from MathQuill to math.js syntax
export function latexToMathJS(latex) {
  if (!latex || latex.trim() === '') return '';
  
  let expr = latex;
  
  // Replace LaTeX commands with math.js equivalents
  const replacements = [
    // Fractions
    [/\\frac\{([^}]+)\}\{([^}]+)\}/g, '($1)/($2)'],
    
    // Superscripts (powers)
    [/\^\\left\{([^}]+)\\right\}/g, '^($1)'],
    [/\^\\{([^}]+)\\}/g, '^($1)'],
    [/\^([a-zA-Z0-9])/g, '^$1'],
    
    // Subscripts (just remove them for now, or could handle as needed)
    [/_\\left\{([^}]+)\\right\}/g, ''],
    [/_\\{([^}]+)\\}/g, ''],
    [/_([a-zA-Z0-9])/g, ''],
    
    // Square root
    [/\\sqrt\{([^}]+)\}/g, 'sqrt($1)'],
    [/\\sqrt\[([^\]]+)\]\{([^}]+)\}/g, '($2)^(1/$1)'],
    
    // Trigonometric functions
    [/\\sin/g, 'sin'],
    [/\\cos/g, 'cos'],
    [/\\tan/g, 'tan'],
    [/\\sec/g, 'sec'],
    [/\\csc/g, 'csc'],
    [/\\cot/g, 'cot'],
    
    // Inverse trig
    [/\\arcsin/g, 'asin'],
    [/\\arccos/g, 'acos'],
    [/\\arctan/g, 'atan'],
    
    // Logarithms
    [/\\log/g, 'log10'],
    [/\\ln/g, 'log'],
    
    // Constants
    [/\\pi/g, 'pi'],
    [/\\e(?![a-z])/g, 'e'],
    
    // Absolute value
    [/\\left\|([^|]+)\\right\|/g, 'abs($1)'],
    
    // Parentheses
    [/\\left\(/g, '('],
    [/\\right\)/g, ')'],
    [/\\left\[/g, '('],
    [/\\right\]/g, ')'],
    
    // Remove remaining LaTeX artifacts
    [/\\left/g, ''],
    [/\\right/g, ''],
    [/\\ /g, ''],
    [/\\,/g, ''],
    
    // Greek letters that might be variables (keep as is)
    [/\\alpha/g, 'alpha'],
    [/\\beta/g, 'beta'],
    [/\\gamma/g, 'gamma'],
    [/\\theta/g, 'theta'],
    
    // Multiplication (explicit)
    [/\\cdot/g, '*'],
    [/\\times/g, '*'],
    
    // Division
    [/\\div/g, '/'],
  ];
  
  // Apply all replacements
  for (const [pattern, replacement] of replacements) {
    expr = expr.replace(pattern, replacement);
  }
  
  // Clean up double spaces
  expr = expr.replace(/\s+/g, ' ').trim();
  
  return expr;
}

// Convert math.js expression to LaTeX for display
export function mathJSToLatex(expr) {
  if (!expr || expr.trim() === '') return '';
  
  let latex = expr;
  
  // Basic conversions (reverse of above, simplified)
  const replacements = [
    // Powers
    [/\^([a-zA-Z0-9]+)/g, '^{$1}'],
    [/\^\(([^)]+)\)/g, '^{$1}'],
    
    // Functions
    [/sqrt\(/g, '\\sqrt{'],
    [/sqrt\(([^)]+)\)/g, '\\sqrt{$1}'],
    
    // Trig
    [/sin/g, '\\sin'],
    [/cos/g, '\\cos'],
    [/tan/g, '\\tan'],
    
    // Constants
    [/pi/g, '\\pi'],
    [/(?<!\\)e(?![a-z])/g, 'e'],
  ];
  
  for (const [pattern, replacement] of replacements) {
    latex = latex.replace(pattern, replacement);
  }
  
  return latex;
}
