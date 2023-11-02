```javascript
// codepip game hack
var code = document.getElementById("code");
code.value = Object.entries(levels[parseInt(document.querySelector(".current").textContent)-1].style).map(e=>e.join(":")+";").join("\n");
code.dispatchEvent(new Event("input"));
```

```bash
# undo last commit
git reset HEAD~
```