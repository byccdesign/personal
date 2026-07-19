/* @ds-bundle: {"format":4,"namespace":"FreelancerBitsDesignSystem_019e2a","components":[],"sourceHashes":{"ui_kits/freelancer/App.jsx":"ebbbe67eb757","ui_kits/freelancer/BrowseProjects.jsx":"ec51bc3b1d67","ui_kits/freelancer/CategoryStrip.jsx":"ac6ab25fc430","ui_kits/freelancer/FeaturedFreelancers.jsx":"c019e091a6a5","ui_kits/freelancer/FilterSidebar.jsx":"193bd7088caa","ui_kits/freelancer/Footer.jsx":"ff78c4f80fdd","ui_kits/freelancer/FreelancerCard.jsx":"f3d7aeaef2ec","ui_kits/freelancer/Header.jsx":"e4873271d775","ui_kits/freelancer/Icon.jsx":"9b238da8e96b","ui_kits/freelancer/ProjectCard.jsx":"e0e84e0d4b71","ui_kits/freelancer/ProjectDetail.jsx":"32d6b6e12643","ui_kits/freelancer/SearchHero.jsx":"a3c66bd9120a","ui_kits/freelancer/data.jsx":"dc75792e7bd9"},"inlinedExternals":[],"unexposedExports":[]} */

(() => {

const __ds_ns = (window.FreelancerBitsDesignSystem_019e2a = window.FreelancerBitsDesignSystem_019e2a || {});

const __ds_scope = {};

(__ds_ns.__errors = __ds_ns.__errors || []);

// ui_kits/freelancer/App.jsx
try { (() => {
// App — root composition + fake navigation between screens
const {
  useState
} = React;
const App = () => {
  const [route, setRoute] = useState('home'); // home | browse | project | freelancers
  const [activeProject, setActiveProject] = useState(null);
  const [showLogin, setShowLogin] = useState(false);
  const go = id => {
    if (id === 'freelancers') setRoute('freelancers');else if (id === 'browse') setRoute('browse');else if (id === 'home') setRoute('home');else if (id === 'enterprise' || id === 'how') {
      // these are flat info pages — keep on home for prototype
      setRoute('home');
    }
    window.scrollTo({
      top: 0,
      behavior: 'instant'
    });
  };
  const openProject = p => {
    setActiveProject(p);
    setRoute('project');
    window.scrollTo({
      top: 0,
      behavior: 'instant'
    });
  };
  return /*#__PURE__*/React.createElement("div", {
    "data-screen-label": '00 ' + route
  }, /*#__PURE__*/React.createElement(Header, {
    current: route === 'project' ? 'browse' : route,
    onNav: go,
    onSignIn: () => setShowLogin(true)
  }), route === 'home' && /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(SearchHero, {
    onSearch: () => go('browse'),
    onPost: () => go('browse')
  }), /*#__PURE__*/React.createElement(CategoryStrip, {
    onPick: () => go('browse')
  }), /*#__PURE__*/React.createElement(FeaturedFreelancers, {
    freelancers: FREELANCERS
  })), route === 'browse' && /*#__PURE__*/React.createElement(BrowseProjects, {
    projects: PROJECTS,
    onOpen: openProject
  }), route === 'project' && activeProject && /*#__PURE__*/React.createElement(ProjectDetail, {
    project: activeProject,
    onBack: () => go('browse')
  }), route === 'freelancers' && /*#__PURE__*/React.createElement(FindFreelancers, {
    freelancers: [...FREELANCERS, ...FREELANCERS]
  }), /*#__PURE__*/React.createElement(Footer, null), showLogin && /*#__PURE__*/React.createElement(LoginModal, {
    onClose: () => setShowLogin(false)
  }));
};
const FindFreelancers = ({
  freelancers
}) => /*#__PURE__*/React.createElement("main", {
  style: {
    background: 'var(--neutral-100)',
    minHeight: '100vh',
    padding: '40px 0'
  }
}, /*#__PURE__*/React.createElement("div", {
  className: "container"
}, /*#__PURE__*/React.createElement("h1", {
  style: {
    fontSize: 32,
    fontWeight: 500,
    color: 'var(--neutral-600)',
    margin: '0 0 6px'
  }
}, "Find your freelancer"), /*#__PURE__*/React.createElement("p", {
  style: {
    fontSize: 15,
    color: 'var(--neutral-500)',
    margin: '0 0 24px'
  }
}, "Hand-picked Preferred Freelancers, ready to start today."), /*#__PURE__*/React.createElement("div", {
  style: {
    display: 'flex',
    gap: 12,
    marginBottom: 24,
    flexWrap: 'wrap'
  }
}, ['All', 'Design', 'Development', 'Writing', 'Marketing', 'Video'].map((c, i) => /*#__PURE__*/React.createElement("button", {
  key: c,
  className: i === 0 ? 'btn btn--primary btn--sm' : 'btn btn--secondary btn--sm'
}, c))), /*#__PURE__*/React.createElement("div", {
  style: {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gap: 20
  }
}, freelancers.map((f, i) => /*#__PURE__*/React.createElement(FreelancerCard, {
  key: i,
  f: f
})))));
const LoginModal = ({
  onClose
}) => /*#__PURE__*/React.createElement("div", {
  onClick: onClose,
  style: {
    position: 'fixed',
    inset: 0,
    background: 'rgba(18, 21, 27, 0.6)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 100,
    padding: 20
  }
}, /*#__PURE__*/React.createElement("div", {
  onClick: e => e.stopPropagation(),
  style: {
    background: '#fff',
    borderRadius: 8,
    padding: 32,
    width: 400,
    maxWidth: '100%',
    boxShadow: 'var(--shadow-lg)',
    position: 'relative'
  }
}, /*#__PURE__*/React.createElement("button", {
  onClick: onClose,
  "aria-label": "Close",
  style: {
    position: 'absolute',
    top: 16,
    right: 16,
    background: 'transparent',
    border: 0,
    color: 'var(--neutral-400)',
    cursor: 'pointer',
    padding: 4,
    display: 'flex'
  }
}, /*#__PURE__*/React.createElement(Icon, {
  name: "close",
  size: 20
})), /*#__PURE__*/React.createElement("img", {
  src: "../../assets/freelancer-logo.svg",
  style: {
    height: 28,
    marginBottom: 20
  },
  alt: "Freelancer"
}), /*#__PURE__*/React.createElement("h2", {
  style: {
    fontSize: 24,
    fontWeight: 500,
    color: 'var(--neutral-600)',
    margin: '0 0 8px'
  }
}, "Log in to Freelancer"), /*#__PURE__*/React.createElement("p", {
  style: {
    fontSize: 14,
    color: 'var(--neutral-500)',
    margin: '0 0 24px'
  }
}, "Welcome back. Pick up where you left off."), /*#__PURE__*/React.createElement("form", {
  onSubmit: e => {
    e.preventDefault();
    onClose();
  }
}, /*#__PURE__*/React.createElement("label", {
  style: {
    display: 'block',
    fontSize: 13,
    fontWeight: 500,
    color: 'var(--neutral-600)',
    marginBottom: 6
  }
}, "Email or username"), /*#__PURE__*/React.createElement("input", {
  className: "input",
  type: "text",
  placeholder: "you@example.com",
  style: {
    marginBottom: 14
  }
}), /*#__PURE__*/React.createElement("label", {
  style: {
    display: 'block',
    fontSize: 13,
    fontWeight: 500,
    color: 'var(--neutral-600)',
    marginBottom: 6
  }
}, "Password"), /*#__PURE__*/React.createElement("input", {
  className: "input",
  type: "password",
  placeholder: "\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022",
  style: {
    marginBottom: 16
  }
}), /*#__PURE__*/React.createElement("button", {
  type: "submit",
  className: "btn btn--primary",
  style: {
    width: '100%',
    marginBottom: 12
  }
}, "Log in")), /*#__PURE__*/React.createElement("div", {
  style: {
    textAlign: 'center',
    fontSize: 13,
    color: 'var(--neutral-400)',
    margin: '16px 0'
  }
}, /*#__PURE__*/React.createElement("span", {
  style: {
    background: '#fff',
    padding: '0 12px',
    position: 'relative',
    zIndex: 1
  }
}, "or continue with"), /*#__PURE__*/React.createElement("hr", {
  style: {
    border: 0,
    borderTop: '1px solid var(--neutral-200)',
    margin: '-9px 0 0',
    position: 'relative',
    zIndex: 0
  }
})), /*#__PURE__*/React.createElement("div", {
  style: {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gap: 8
  }
}, ['Google', 'Apple', 'Facebook'].map(p => /*#__PURE__*/React.createElement("button", {
  key: p,
  className: "btn btn--secondary btn--sm",
  style: {
    height: 40
  }
}, p))), /*#__PURE__*/React.createElement("p", {
  style: {
    textAlign: 'center',
    fontSize: 13,
    color: 'var(--neutral-500)',
    margin: '20px 0 0'
  }
}, "New here? ", /*#__PURE__*/React.createElement("a", {
  href: "#",
  onClick: e => e.preventDefault(),
  style: {
    color: 'var(--blue-600)',
    fontWeight: 500,
    textDecoration: 'none'
  }
}, "Create an account"))));
window.App = App;

// Mount
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(/*#__PURE__*/React.createElement(App, null));
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/freelancer/App.jsx", error: String((e && e.message) || e) }); }

// ui_kits/freelancer/BrowseProjects.jsx
try { (() => {
// Browse Projects page composition (sidebar + project list)
const BrowseProjects = ({
  projects,
  onOpen
}) => {
  const [filters, setFilters] = React.useState({
    type: 'any',
    country: 'any'
  });
  const [sort, setSort] = React.useState('latest');
  return /*#__PURE__*/React.createElement("main", {
    style: {
      background: 'var(--neutral-100)',
      minHeight: '100vh',
      padding: '32px 0'
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "container"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      marginBottom: 24
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 13,
      color: 'var(--neutral-400)',
      marginBottom: 6
    }
  }, /*#__PURE__*/React.createElement("a", {
    href: "#",
    onClick: e => e.preventDefault(),
    style: {
      color: 'var(--blue-600)',
      textDecoration: 'none'
    }
  }, "Home"), /*#__PURE__*/React.createElement("span", {
    style: {
      margin: '0 8px'
    }
  }, "\u203A"), "Browse projects"), /*#__PURE__*/React.createElement("h1", {
    style: {
      fontSize: 32,
      fontWeight: 500,
      color: 'var(--neutral-600)',
      margin: '0 0 6px'
    }
  }, "Browse open projects"), /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: 15,
      color: 'var(--neutral-500)',
      margin: 0
    }
  }, projects.length.toLocaleString(), " projects open right now \xB7 80% receive bids within 60 seconds.")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 24
    }
  }, /*#__PURE__*/React.createElement(FilterSidebar, {
    filters: filters,
    setFilters: setFilters
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      minWidth: 0
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      background: '#fff',
      border: '1px solid var(--neutral-300)',
      borderRadius: 8,
      padding: '12px 20px',
      marginBottom: 16,
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      gap: 16
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative',
      flex: 1,
      maxWidth: 360
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      position: 'absolute',
      left: 14,
      top: '50%',
      transform: 'translateY(-50%)',
      color: 'var(--neutral-400)',
      display: 'flex'
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "search",
    size: 18
  })), /*#__PURE__*/React.createElement("input", {
    className: "input",
    style: {
      paddingLeft: 40,
      height: 36,
      fontSize: 14
    },
    placeholder: "Search within results"
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 12,
      fontSize: 14,
      color: 'var(--neutral-500)'
    }
  }, "Sort by:", /*#__PURE__*/React.createElement("select", {
    value: sort,
    onChange: e => setSort(e.target.value),
    style: {
      height: 36,
      padding: '0 12px',
      borderRadius: 6,
      border: '1px solid var(--neutral-300)',
      background: '#fff',
      fontSize: 14,
      color: 'var(--neutral-600)',
      fontFamily: 'inherit'
    }
  }, /*#__PURE__*/React.createElement("option", {
    value: "latest"
  }, "Latest"), /*#__PURE__*/React.createElement("option", {
    value: "budget"
  }, "Highest budget"), /*#__PURE__*/React.createElement("option", {
    value: "bids"
  }, "Fewest bids"), /*#__PURE__*/React.createElement("option", {
    value: "ending"
  }, "Ending soon")))), projects.map(p => /*#__PURE__*/React.createElement(ProjectCard, {
    key: p.id,
    project: p,
    onOpen: onOpen
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      gap: 4,
      marginTop: 24
    }
  }, /*#__PURE__*/React.createElement("button", {
    className: "btn btn--ghost btn--sm",
    disabled: true,
    style: {
      opacity: 0.5
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "chevronLeft",
    size: 16
  }), " Prev"), [1, 2, 3, 4, 5].map(n => /*#__PURE__*/React.createElement("button", {
    key: n,
    className: n === 1 ? 'btn btn--primary btn--sm' : 'btn btn--ghost btn--sm',
    style: {
      minWidth: 36,
      padding: 0
    }
  }, n)), /*#__PURE__*/React.createElement("span", {
    style: {
      color: 'var(--neutral-400)',
      padding: '0 6px'
    }
  }, "\u2026"), /*#__PURE__*/React.createElement("button", {
    className: "btn btn--ghost btn--sm",
    style: {
      minWidth: 36,
      padding: 0
    }
  }, "248"), /*#__PURE__*/React.createElement("button", {
    className: "btn btn--ghost btn--sm"
  }, "Next ", /*#__PURE__*/React.createElement(Icon, {
    name: "chevronRight",
    size: 16
  })))))));
};
window.BrowseProjects = BrowseProjects;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/freelancer/BrowseProjects.jsx", error: String((e && e.message) || e) }); }

// ui_kits/freelancer/CategoryStrip.jsx
try { (() => {
const CategoryStrip = ({
  onPick
}) => {
  const cats = [{
    id: 'web',
    name: 'Web Development',
    jobs: '12.3k',
    color: 'var(--blue-600)'
  }, {
    id: 'design',
    name: 'Logo Design',
    jobs: '8.7k',
    color: 'var(--orange-600)'
  }, {
    id: 'mobile',
    name: 'Mobile Apps',
    jobs: '5.2k',
    color: 'var(--purple-400)'
  }, {
    id: 'write',
    name: 'Writing',
    jobs: '6.4k',
    color: 'var(--green-500)'
  }, {
    id: 'video',
    name: 'Video & Animation',
    jobs: '3.1k',
    color: 'var(--pink-400)'
  }, {
    id: 'data',
    name: 'Data Entry',
    jobs: '9.8k',
    color: 'var(--aqua-400)'
  }, {
    id: 'market',
    name: 'Marketing',
    jobs: '4.0k',
    color: 'var(--blue-700)'
  }, {
    id: 'trans',
    name: 'Translation',
    jobs: '2.3k',
    color: 'var(--yellow-500)'
  }];
  return /*#__PURE__*/React.createElement("section", {
    style: {
      padding: '64px 0',
      borderBottom: '1px solid var(--neutral-200)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "container"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'baseline',
      justifyContent: 'space-between',
      marginBottom: 32
    }
  }, /*#__PURE__*/React.createElement("h2", {
    style: {
      fontSize: 28,
      fontWeight: 500,
      color: 'var(--neutral-600)',
      margin: 0
    }
  }, "Browse top categories"), /*#__PURE__*/React.createElement("a", {
    href: "#",
    onClick: e => e.preventDefault(),
    style: {
      color: 'var(--blue-600)',
      fontSize: 14,
      fontWeight: 500,
      textDecoration: 'none'
    }
  }, "View all 2,700+ skills \u2192")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: 'repeat(4, 1fr)',
      gap: 16
    }
  }, cats.map(c => /*#__PURE__*/React.createElement("button", {
    key: c.id,
    onClick: () => onPick && onPick(c.id),
    className: "card card--hover",
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 16,
      textAlign: 'left',
      cursor: 'pointer',
      fontFamily: 'inherit',
      padding: 20
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: 44,
      height: 44,
      borderRadius: 8,
      background: c.color + '20',
      color: c.color,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "briefcase",
    size: 22
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      minWidth: 0
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 15,
      fontWeight: 500,
      color: 'var(--neutral-600)'
    }
  }, c.name), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 12,
      color: 'var(--neutral-400)',
      marginTop: 2
    }
  }, c.jobs, " open jobs")))))));
};
window.CategoryStrip = CategoryStrip;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/freelancer/CategoryStrip.jsx", error: String((e && e.message) || e) }); }

// ui_kits/freelancer/FeaturedFreelancers.jsx
try { (() => {
const FeaturedFreelancers = ({
  freelancers
}) => /*#__PURE__*/React.createElement("section", {
  style: {
    padding: '64px 0',
    background: 'var(--neutral-100)'
  }
}, /*#__PURE__*/React.createElement("div", {
  className: "container"
}, /*#__PURE__*/React.createElement("div", {
  style: {
    display: 'flex',
    alignItems: 'baseline',
    justifyContent: 'space-between',
    marginBottom: 32
  }
}, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h2", {
  style: {
    fontSize: 28,
    fontWeight: 500,
    color: 'var(--neutral-600)',
    margin: '0 0 6px'
  }
}, "Featured Preferred Freelancers"), /*#__PURE__*/React.createElement("p", {
  style: {
    fontSize: 14,
    color: 'var(--neutral-500)',
    margin: 0
  }
}, "The top 3% of talent, hand-picked by our recruiters.")), /*#__PURE__*/React.createElement("a", {
  href: "#",
  onClick: e => e.preventDefault(),
  style: {
    color: 'var(--blue-600)',
    fontSize: 14,
    fontWeight: 500,
    textDecoration: 'none'
  }
}, "Browse all freelancers \u2192")), /*#__PURE__*/React.createElement("div", {
  style: {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gap: 20
  }
}, freelancers.map(f => /*#__PURE__*/React.createElement(FreelancerCard, {
  key: f.name,
  f: f
})))));
window.FeaturedFreelancers = FeaturedFreelancers;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/freelancer/FeaturedFreelancers.jsx", error: String((e && e.message) || e) }); }

// ui_kits/freelancer/FilterSidebar.jsx
try { (() => {
const FilterSidebar = ({
  filters,
  setFilters
}) => {
  const Group = ({
    title,
    children
  }) => /*#__PURE__*/React.createElement("div", {
    style: {
      marginBottom: 24,
      paddingBottom: 24,
      borderBottom: '1px solid var(--neutral-200)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 13,
      fontWeight: 500,
      color: 'var(--neutral-600)',
      marginBottom: 12,
      textTransform: 'uppercase',
      letterSpacing: '0.04em'
    }
  }, title), children);
  const Checkbox = ({
    label,
    count,
    value,
    group
  }) => {
    const checked = (filters[group] || []).includes(value);
    return /*#__PURE__*/React.createElement("label", {
      style: {
        display: 'flex',
        alignItems: 'center',
        gap: 10,
        padding: '6px 0',
        cursor: 'pointer',
        fontSize: 14,
        color: 'var(--neutral-500)'
      }
    }, /*#__PURE__*/React.createElement("input", {
      type: "checkbox",
      checked: checked,
      onChange: () => {
        const cur = filters[group] || [];
        setFilters({
          ...filters,
          [group]: checked ? cur.filter(v => v !== value) : [...cur, value]
        });
      },
      style: {
        accentColor: 'var(--blue-600)',
        width: 16,
        height: 16
      }
    }), /*#__PURE__*/React.createElement("span", {
      style: {
        flex: 1
      }
    }, label), count != null && /*#__PURE__*/React.createElement("span", {
      style: {
        color: 'var(--neutral-400)',
        fontSize: 12
      }
    }, count));
  };
  const Radio = ({
    label,
    value,
    group
  }) => {
    const active = filters[group] === value;
    return /*#__PURE__*/React.createElement("label", {
      style: {
        display: 'flex',
        alignItems: 'center',
        gap: 10,
        padding: '6px 0',
        cursor: 'pointer',
        fontSize: 14,
        color: 'var(--neutral-500)'
      }
    }, /*#__PURE__*/React.createElement("input", {
      type: "radio",
      name: group,
      checked: active,
      onChange: () => setFilters({
        ...filters,
        [group]: value
      }),
      style: {
        accentColor: 'var(--blue-600)',
        width: 16,
        height: 16
      }
    }), label);
  };
  return /*#__PURE__*/React.createElement("aside", {
    style: {
      width: 264,
      flexShrink: 0,
      background: '#fff',
      border: '1px solid var(--neutral-300)',
      borderRadius: 8,
      padding: 20,
      alignSelf: 'flex-start',
      position: 'sticky',
      top: 88
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginBottom: 20
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 8,
      fontWeight: 500,
      color: 'var(--neutral-600)'
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "filter",
    size: 18
  }), " Filters"), /*#__PURE__*/React.createElement("button", {
    onClick: () => setFilters({}),
    style: {
      background: 'transparent',
      border: 0,
      color: 'var(--blue-600)',
      cursor: 'pointer',
      fontSize: 13,
      fontFamily: 'inherit'
    }
  }, "Clear all")), /*#__PURE__*/React.createElement(Group, {
    title: "Project type"
  }, /*#__PURE__*/React.createElement(Radio, {
    label: "Any",
    value: "any",
    group: "type"
  }), /*#__PURE__*/React.createElement(Radio, {
    label: "Fixed price",
    value: "fixed",
    group: "type"
  }), /*#__PURE__*/React.createElement(Radio, {
    label: "Hourly",
    value: "hourly",
    group: "type"
  })), /*#__PURE__*/React.createElement(Group, {
    title: "Budget (USD)"
  }, /*#__PURE__*/React.createElement(Checkbox, {
    label: "Under $250",
    count: "2.1k",
    value: "0-250",
    group: "budget"
  }), /*#__PURE__*/React.createElement(Checkbox, {
    label: "$250 \u2013 $750",
    count: "3.4k",
    value: "250-750",
    group: "budget"
  }), /*#__PURE__*/React.createElement(Checkbox, {
    label: "$750 \u2013 $1,500",
    count: "1.8k",
    value: "750-1.5k",
    group: "budget"
  }), /*#__PURE__*/React.createElement(Checkbox, {
    label: "$1,500 \u2013 $3,000",
    count: "942",
    value: "1.5k-3k",
    group: "budget"
  }), /*#__PURE__*/React.createElement(Checkbox, {
    label: "Over $3,000",
    count: "612",
    value: "3k+",
    group: "budget"
  })), /*#__PURE__*/React.createElement(Group, {
    title: "Skills"
  }, /*#__PURE__*/React.createElement(Checkbox, {
    label: "PHP",
    count: "412",
    value: "php",
    group: "skills"
  }), /*#__PURE__*/React.createElement(Checkbox, {
    label: "React",
    count: "289",
    value: "react",
    group: "skills"
  }), /*#__PURE__*/React.createElement(Checkbox, {
    label: "WordPress",
    count: "618",
    value: "wp",
    group: "skills"
  }), /*#__PURE__*/React.createElement(Checkbox, {
    label: "Logo Design",
    count: "334",
    value: "logo",
    group: "skills"
  }), /*#__PURE__*/React.createElement(Checkbox, {
    label: "Copywriting",
    count: "201",
    value: "copy",
    group: "skills"
  })), /*#__PURE__*/React.createElement(Group, {
    title: "Project status"
  }, /*#__PURE__*/React.createElement(Checkbox, {
    label: "Sealed (private bids)",
    value: "sealed",
    group: "status"
  }), /*#__PURE__*/React.createElement(Checkbox, {
    label: "Featured",
    value: "featured",
    group: "status"
  }), /*#__PURE__*/React.createElement(Checkbox, {
    label: "NDA required",
    value: "nda",
    group: "status"
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      marginBottom: 0
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 13,
      fontWeight: 500,
      color: 'var(--neutral-600)',
      marginBottom: 12,
      textTransform: 'uppercase',
      letterSpacing: '0.04em'
    }
  }, "Country"), /*#__PURE__*/React.createElement(Radio, {
    label: "Anywhere",
    value: "any",
    group: "country"
  }), /*#__PURE__*/React.createElement(Radio, {
    label: "United States",
    value: "us",
    group: "country"
  }), /*#__PURE__*/React.createElement(Radio, {
    label: "United Kingdom",
    value: "uk",
    group: "country"
  }), /*#__PURE__*/React.createElement(Radio, {
    label: "Australia",
    value: "au",
    group: "country"
  })));
};
window.FilterSidebar = FilterSidebar;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/freelancer/FilterSidebar.jsx", error: String((e && e.message) || e) }); }

// ui_kits/freelancer/Footer.jsx
try { (() => {
const Footer = () => /*#__PURE__*/React.createElement("footer", {
  style: {
    background: 'var(--neutral-700)',
    color: 'var(--neutral-300)',
    padding: '48px 0 24px',
    marginTop: 64
  }
}, /*#__PURE__*/React.createElement("div", {
  className: "container"
}, /*#__PURE__*/React.createElement("div", {
  style: {
    display: 'grid',
    gridTemplateColumns: '1.5fr 1fr 1fr 1fr 1fr',
    gap: 40,
    marginBottom: 40
  }
}, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("img", {
  src: "../../assets/freelancer-logo.svg",
  alt: "Freelancer",
  style: {
    height: 28,
    marginBottom: 16,
    filter: 'brightness(0) invert(1) sepia(1) hue-rotate(180deg) saturate(3)'
  }
}), /*#__PURE__*/React.createElement("p", {
  style: {
    fontSize: 13,
    lineHeight: 1.6,
    color: 'var(--neutral-300)',
    margin: 0,
    maxWidth: 280
  }
}, "The world's largest freelancing marketplace. 88M+ professionals across 2,700+ skills.")), [{
  h: 'About',
  items: ['About us', 'How it works', 'Careers', 'News', 'Investor']
}, {
  h: 'For Clients',
  items: ['Post a project', 'Browse freelancers', 'Enterprise', 'Project management']
}, {
  h: 'For Freelancers',
  items: ['Browse projects', 'Membership', 'Preferred Freelancer', 'Showcase']
}, {
  h: 'Support',
  items: ['Help & support', 'Trust & safety', 'Contact us', 'API']
}].map(col => /*#__PURE__*/React.createElement("div", {
  key: col.h
}, /*#__PURE__*/React.createElement("div", {
  style: {
    fontSize: 13,
    fontWeight: 500,
    color: '#fff',
    marginBottom: 12,
    textTransform: 'uppercase',
    letterSpacing: '0.04em'
  }
}, col.h), /*#__PURE__*/React.createElement("ul", {
  style: {
    listStyle: 'none',
    padding: 0,
    margin: 0,
    display: 'flex',
    flexDirection: 'column',
    gap: 8
  }
}, col.items.map(i => /*#__PURE__*/React.createElement("li", {
  key: i
}, /*#__PURE__*/React.createElement("a", {
  href: "#",
  onClick: e => e.preventDefault(),
  style: {
    color: 'var(--neutral-300)',
    fontSize: 13,
    textDecoration: 'none'
  }
}, i))))))), /*#__PURE__*/React.createElement("div", {
  style: {
    paddingTop: 24,
    borderTop: '1px solid rgba(255,255,255,0.08)',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    fontSize: 12,
    color: 'var(--neutral-400)'
  }
}, /*#__PURE__*/React.createElement("div", null, "\xA9 2026 Freelancer Technology Pty Limited."), /*#__PURE__*/React.createElement("div", {
  style: {
    display: 'flex',
    gap: 16
  }
}, /*#__PURE__*/React.createElement("a", {
  href: "#",
  onClick: e => e.preventDefault(),
  style: {
    color: 'var(--neutral-400)',
    textDecoration: 'none'
  }
}, "Privacy"), /*#__PURE__*/React.createElement("a", {
  href: "#",
  onClick: e => e.preventDefault(),
  style: {
    color: 'var(--neutral-400)',
    textDecoration: 'none'
  }
}, "Terms"), /*#__PURE__*/React.createElement("a", {
  href: "#",
  onClick: e => e.preventDefault(),
  style: {
    color: 'var(--neutral-400)',
    textDecoration: 'none'
  }
}, "Cookies"), /*#__PURE__*/React.createElement("a", {
  href: "#",
  onClick: e => e.preventDefault(),
  style: {
    color: 'var(--neutral-400)',
    textDecoration: 'none'
  }
}, "Sitemap")))));
window.Footer = Footer;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/freelancer/Footer.jsx", error: String((e && e.message) || e) }); }

// ui_kits/freelancer/FreelancerCard.jsx
try { (() => {
const FreelancerCard = ({
  f
}) => /*#__PURE__*/React.createElement("article", {
  className: "card card--hover",
  style: {
    padding: 20
  }
}, /*#__PURE__*/React.createElement("div", {
  style: {
    display: 'flex',
    alignItems: 'flex-start',
    gap: 14,
    marginBottom: 14
  }
}, /*#__PURE__*/React.createElement("div", {
  className: "avatar",
  style: {
    width: 56,
    height: 56,
    fontSize: 18,
    background: f.bg || 'linear-gradient(135deg, var(--orange-300), var(--orange-600))'
  }
}, f.initials), /*#__PURE__*/React.createElement("div", {
  style: {
    flex: 1,
    minWidth: 0
  }
}, /*#__PURE__*/React.createElement("div", {
  style: {
    display: 'flex',
    alignItems: 'center',
    gap: 6,
    marginBottom: 2
  }
}, /*#__PURE__*/React.createElement("span", {
  style: {
    fontSize: 15,
    fontWeight: 500,
    color: 'var(--neutral-600)'
  }
}, f.name), f.preferred && /*#__PURE__*/React.createElement("span", {
  className: "badge-preferred"
}, "PREFERRED")), /*#__PURE__*/React.createElement("div", {
  style: {
    fontSize: 13,
    color: 'var(--neutral-500)',
    marginBottom: 4
  }
}, f.title), /*#__PURE__*/React.createElement("div", {
  style: {
    display: 'flex',
    alignItems: 'center',
    gap: 6,
    fontSize: 12,
    color: 'var(--neutral-400)'
  }
}, /*#__PURE__*/React.createElement("span", {
  className: "stars stars--sm"
}, "\u2605\u2605\u2605\u2605\u2605"), /*#__PURE__*/React.createElement("span", {
  style: {
    color: 'var(--neutral-600)',
    fontWeight: 500
  }
}, f.rating), /*#__PURE__*/React.createElement("span", null, "(", f.reviews, ")"), /*#__PURE__*/React.createElement("span", {
  style: {
    color: 'var(--neutral-300)'
  }
}, "\xB7"), /*#__PURE__*/React.createElement("span", {
  style: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: 3
  }
}, /*#__PURE__*/React.createElement(Icon, {
  name: "pin",
  size: 12
}), f.country)))), /*#__PURE__*/React.createElement("p", {
  style: {
    fontSize: 13,
    lineHeight: 1.5,
    color: 'var(--neutral-500)',
    margin: '0 0 14px',
    display: '-webkit-box',
    WebkitLineClamp: 2,
    WebkitBoxOrient: 'vertical',
    overflow: 'hidden'
  }
}, f.tagline), /*#__PURE__*/React.createElement("div", {
  style: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: 6,
    marginBottom: 16
  }
}, f.skills.map(s => /*#__PURE__*/React.createElement("span", {
  key: s,
  className: "tag"
}, s))), /*#__PURE__*/React.createElement("div", {
  style: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 14,
    borderTop: '1px solid var(--neutral-200)'
  }
}, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("span", {
  style: {
    fontSize: 18,
    fontWeight: 700,
    color: 'var(--neutral-600)'
  }
}, f.rate), /*#__PURE__*/React.createElement("span", {
  style: {
    fontSize: 12,
    color: 'var(--neutral-400)'
  }
}, " / hr")), /*#__PURE__*/React.createElement("button", {
  className: "btn btn--secondary btn--sm"
}, "Hire ", f.name.split(' ')[0])));
window.FreelancerCard = FreelancerCard;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/freelancer/FreelancerCard.jsx", error: String((e && e.message) || e) }); }

// ui_kits/freelancer/Header.jsx
try { (() => {
const Header = ({
  onNav,
  current,
  onSignIn
}) => {
  const NavLink = ({
    id,
    children
  }) => /*#__PURE__*/React.createElement("a", {
    href: "#",
    onClick: e => {
      e.preventDefault();
      onNav && onNav(id);
    },
    style: {
      color: current === id ? 'var(--blue-600)' : 'var(--neutral-600)',
      fontSize: 14,
      fontWeight: 500,
      textDecoration: 'none',
      padding: '20px 12px',
      borderBottom: current === id ? '2px solid var(--blue-600)' : '2px solid transparent',
      display: 'inline-flex',
      alignItems: 'center',
      height: 64,
      boxSizing: 'border-box'
    }
  }, children);
  return /*#__PURE__*/React.createElement("header", {
    style: {
      position: 'sticky',
      top: 0,
      zIndex: 50,
      background: '#fff',
      borderBottom: '1px solid var(--neutral-300)',
      height: 64,
      display: 'flex',
      alignItems: 'center'
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "container",
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 24,
      height: '100%',
      width: '100%'
    }
  }, /*#__PURE__*/React.createElement("a", {
    href: "#",
    onClick: e => {
      e.preventDefault();
      onNav && onNav('home');
    },
    style: {
      display: 'inline-flex',
      alignItems: 'center'
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: "../../assets/freelancer-logo.svg",
    alt: "Freelancer",
    style: {
      height: 26
    }
  })), /*#__PURE__*/React.createElement("nav", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 4,
      marginLeft: 12
    }
  }, /*#__PURE__*/React.createElement(NavLink, {
    id: "browse"
  }, "Browse projects"), /*#__PURE__*/React.createElement(NavLink, {
    id: "freelancers"
  }, "Find freelancers"), /*#__PURE__*/React.createElement(NavLink, {
    id: "enterprise"
  }, "Enterprise"), /*#__PURE__*/React.createElement(NavLink, {
    id: "how"
  }, "How it works")), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 12
    }
  }, /*#__PURE__*/React.createElement("button", {
    className: "btn btn--ghost btn--sm",
    onClick: onSignIn
  }, "Log in"), /*#__PURE__*/React.createElement("button", {
    className: "btn btn--primary btn--sm"
  }, "Sign up"))));
};
window.Header = Header;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/freelancer/Header.jsx", error: String((e && e.message) || e) }); }

// ui_kits/freelancer/Icon.jsx
try { (() => {
// Lucide-style inline SVG icons — currentColor, stroke 1.75. Substitute for flicon.
const Icon = ({
  name,
  size = 20,
  className = ''
}) => {
  const paths = ICONS[name];
  if (!paths) return null;
  return /*#__PURE__*/React.createElement("svg", {
    className: `ico ${className}`,
    style: {
      width: size,
      height: size
    },
    viewBox: "0 0 24 24",
    "aria-hidden": "true"
  }, paths);
};
const ICONS = {
  search: /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("circle", {
    cx: "11",
    cy: "11",
    r: "7"
  }), /*#__PURE__*/React.createElement("path", {
    d: "m21 21-4.3-4.3"
  })),
  user: /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("path", {
    d: "M20 21a8 8 0 1 0-16 0"
  }), /*#__PURE__*/React.createElement("circle", {
    cx: "12",
    cy: "7",
    r: "4"
  })),
  message: /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("path", {
    d: "M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"
  })),
  bell: /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("path", {
    d: "M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M10.3 21a1.94 1.94 0 0 0 3.4 0"
  })),
  star: /*#__PURE__*/React.createElement("polygon", {
    points: "12 2 15 8.5 22 9.3 17 14.1 18.2 21 12 17.8 5.8 21 7 14.1 2 9.3 9 8.5",
    fill: "currentColor",
    stroke: "none"
  }),
  bookmark: /*#__PURE__*/React.createElement("path", {
    d: "M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"
  }),
  menu: /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("path", {
    d: "M3 6h18"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M3 12h18"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M3 18h18"
  })),
  chevronDown: /*#__PURE__*/React.createElement("path", {
    d: "m6 9 6 6 6-6"
  }),
  chevronRight: /*#__PURE__*/React.createElement("path", {
    d: "m9 6 6 6-6 6"
  }),
  chevronLeft: /*#__PURE__*/React.createElement("path", {
    d: "m15 6-6 6 6 6"
  }),
  close: /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("path", {
    d: "M18 6 6 18"
  }), /*#__PURE__*/React.createElement("path", {
    d: "m6 6 12 12"
  })),
  plus: /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("path", {
    d: "M12 5v14"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M5 12h14"
  })),
  check: /*#__PURE__*/React.createElement("path", {
    d: "M5 12l5 5L20 7"
  }),
  clock: /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("circle", {
    cx: "12",
    cy: "12",
    r: "10"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M12 6v6l4 2"
  })),
  dollar: /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("path", {
    d: "M12 2v20"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"
  })),
  globe: /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("circle", {
    cx: "12",
    cy: "12",
    r: "10"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M2 12h20"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M12 2a15 15 0 0 1 0 20"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M12 2a15 15 0 0 0 0 20"
  })),
  briefcase: /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("rect", {
    x: "2",
    y: "7",
    width: "20",
    height: "14",
    rx: "2"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"
  })),
  pin: /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("path", {
    d: "M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"
  }), /*#__PURE__*/React.createElement("circle", {
    cx: "12",
    cy: "10",
    r: "3"
  })),
  filter: /*#__PURE__*/React.createElement("path", {
    d: "M22 3H2l8 9.5V19l4 2v-8.5L22 3z"
  }),
  heart: /*#__PURE__*/React.createElement("path", {
    d: "M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"
  }),
  trending: /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("polyline", {
    points: "22 7 13.5 15.5 8.5 10.5 2 17"
  }), /*#__PURE__*/React.createElement("polyline", {
    points: "16 7 22 7 22 13"
  }))
};
window.Icon = Icon;
window.ICONS = ICONS;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/freelancer/Icon.jsx", error: String((e && e.message) || e) }); }

// ui_kits/freelancer/ProjectCard.jsx
try { (() => {
const ProjectCard = ({
  project,
  onOpen
}) => {
  const {
    title,
    desc,
    tags,
    budget,
    type,
    bids,
    posted,
    country,
    sealed,
    featured
  } = project;
  return /*#__PURE__*/React.createElement("article", {
    className: "card card--hover",
    onClick: () => onOpen && onOpen(project),
    style: {
      marginBottom: 16,
      padding: 24
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'flex-start',
      gap: 24,
      marginBottom: 8
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      minWidth: 0
    }
  }, /*#__PURE__*/React.createElement("h3", {
    style: {
      fontSize: 18,
      fontWeight: 500,
      color: 'var(--neutral-600)',
      margin: '0 0 4px'
    }
  }, /*#__PURE__*/React.createElement("a", {
    href: "#",
    onClick: e => {
      e.preventDefault();
      onOpen && onOpen(project);
    },
    style: {
      color: 'inherit',
      textDecoration: 'none'
    }
  }, title)), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 12,
      fontSize: 12,
      color: 'var(--neutral-400)'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: 4
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "clock",
    size: 14
  }), posted), /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: 4
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "pin",
    size: 14
  }), country), featured && /*#__PURE__*/React.createElement("span", {
    className: "badge-preferred",
    style: {
      background: 'var(--blue-600)'
    }
  }, "FEATURED"), sealed && /*#__PURE__*/React.createElement("span", {
    className: "tag tag--blue"
  }, "Sealed"))), /*#__PURE__*/React.createElement("button", {
    onClick: e => e.stopPropagation(),
    style: {
      background: 'transparent',
      border: 0,
      color: 'var(--neutral-400)',
      cursor: 'pointer',
      padding: 4,
      display: 'flex'
    },
    "aria-label": "Save"
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "bookmark",
    size: 20
  }))), /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: 14,
      lineHeight: 1.5,
      color: 'var(--neutral-500)',
      margin: '0 0 16px',
      display: '-webkit-box',
      WebkitLineClamp: 2,
      WebkitBoxOrient: 'vertical',
      overflow: 'hidden'
    }
  }, desc), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexWrap: 'wrap',
      gap: 6,
      marginBottom: 16
    }
  }, tags.map(t => /*#__PURE__*/React.createElement("span", {
    key: t,
    className: "tag"
  }, t))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingTop: 16,
      borderTop: '1px solid var(--neutral-200)'
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 16,
      fontWeight: 700,
      color: 'var(--neutral-600)'
    }
  }, budget), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 12,
      color: 'var(--neutral-400)'
    }
  }, type)), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 13,
      color: 'var(--neutral-500)'
    }
  }, /*#__PURE__*/React.createElement("strong", {
    style: {
      color: 'var(--neutral-600)'
    }
  }, bids), " bids \xB7 avg ", /*#__PURE__*/React.createElement("strong", {
    style: {
      color: 'var(--neutral-600)'
    }
  }, project.avg)), /*#__PURE__*/React.createElement("button", {
    className: "btn btn--secondary btn--sm",
    onClick: e => {
      e.stopPropagation();
      onOpen && onOpen(project);
    }
  }, "Bid now")));
};
window.ProjectCard = ProjectCard;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/freelancer/ProjectCard.jsx", error: String((e && e.message) || e) }); }

// ui_kits/freelancer/ProjectDetail.jsx
try { (() => {
const ProjectDetail = ({
  project,
  onBack
}) => {
  const [amount, setAmount] = React.useState('');
  const [days, setDays] = React.useState('');
  const [pitch, setPitch] = React.useState('');
  const [placed, setPlaced] = React.useState(false);
  return /*#__PURE__*/React.createElement("main", {
    style: {
      background: 'var(--neutral-100)',
      minHeight: '100vh',
      padding: '32px 0'
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "container"
  }, /*#__PURE__*/React.createElement("button", {
    onClick: onBack,
    className: "btn btn--ghost btn--sm",
    style: {
      marginBottom: 16,
      padding: '0 10px'
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "chevronLeft",
    size: 16
  }), " Back to projects"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: '1fr 380px',
      gap: 24
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "card",
    style: {
      padding: 32
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 10,
      marginBottom: 12
    }
  }, project.featured && /*#__PURE__*/React.createElement("span", {
    className: "badge-preferred",
    style: {
      background: 'var(--blue-600)'
    }
  }, "FEATURED"), project.sealed && /*#__PURE__*/React.createElement("span", {
    className: "tag tag--blue"
  }, "Sealed"), /*#__PURE__*/React.createElement("span", {
    className: "pill pill--success"
  }, "Open")), /*#__PURE__*/React.createElement("h1", {
    style: {
      fontSize: 32,
      fontWeight: 500,
      color: 'var(--neutral-600)',
      margin: '0 0 12px',
      lineHeight: 1.2
    }
  }, project.title), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 24,
      fontSize: 13,
      color: 'var(--neutral-500)',
      marginBottom: 24,
      paddingBottom: 24,
      borderBottom: '1px solid var(--neutral-200)'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: 6
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "clock",
    size: 14
  }), "Posted ", project.posted), /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: 6
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "pin",
    size: 14
  }), project.country), /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: 6
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "briefcase",
    size: 14
  }), project.type), /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: 6
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "user",
    size: 14
  }), project.bids, " bids")), /*#__PURE__*/React.createElement("h3", {
    style: {
      fontSize: 16,
      fontWeight: 500,
      margin: '0 0 12px',
      color: 'var(--neutral-600)'
    }
  }, "Project description"), /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: 15,
      lineHeight: 1.7,
      color: 'var(--neutral-500)',
      margin: '0 0 16px'
    }
  }, project.desc), /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: 15,
      lineHeight: 1.7,
      color: 'var(--neutral-500)',
      margin: '0 0 16px'
    }
  }, "Deliverables include source files, deployment guidance, and 30 days of post-launch support. I'd like to start within the next week and review milestones weekly."), /*#__PURE__*/React.createElement("h3", {
    style: {
      fontSize: 16,
      fontWeight: 500,
      margin: '24px 0 12px',
      color: 'var(--neutral-600)'
    }
  }, "Skills required"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexWrap: 'wrap',
      gap: 8,
      marginBottom: 24
    }
  }, project.tags.map(t => /*#__PURE__*/React.createElement("span", {
    key: t,
    className: "tag",
    style: {
      padding: '6px 12px',
      fontSize: 13
    }
  }, t))), /*#__PURE__*/React.createElement("div", {
    style: {
      paddingTop: 24,
      borderTop: '1px solid var(--neutral-200)'
    }
  }, /*#__PURE__*/React.createElement("h3", {
    style: {
      fontSize: 16,
      fontWeight: 500,
      margin: '0 0 12px',
      color: 'var(--neutral-600)'
    }
  }, "About the client"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 14
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "avatar",
    style: {
      width: 48,
      height: 48,
      background: 'linear-gradient(135deg, var(--blue-400), var(--blue-700))'
    }
  }, "AC"), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 15,
      fontWeight: 500,
      color: 'var(--neutral-600)'
    }
  }, "Anonymous client"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 8,
      fontSize: 13,
      color: 'var(--neutral-500)'
    }
  }, /*#__PURE__*/React.createElement("span", {
    className: "stars stars--sm"
  }, "\u2605\u2605\u2605\u2605\u2605"), " 4.8 \xB7 142 reviews \xB7 ", /*#__PURE__*/React.createElement("span", {
    style: {
      color: 'var(--green-500)'
    }
  }, "Payment verified")))))), /*#__PURE__*/React.createElement("aside", {
    style: {
      alignSelf: 'flex-start',
      position: 'sticky',
      top: 88
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "card",
    style: {
      padding: 24,
      marginBottom: 16
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 13,
      color: 'var(--neutral-400)',
      marginBottom: 6,
      textTransform: 'uppercase',
      fontWeight: 500,
      letterSpacing: '0.04em'
    }
  }, "Budget"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 28,
      fontWeight: 700,
      color: 'var(--neutral-600)',
      marginBottom: 4
    }
  }, project.budget), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 13,
      color: 'var(--neutral-400)'
    }
  }, project.type), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 16,
      marginTop: 20,
      marginBottom: 20,
      fontSize: 13,
      color: 'var(--neutral-500)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      color: 'var(--neutral-400)',
      fontSize: 12,
      marginBottom: 2
    }
  }, "Total bids"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 18,
      fontWeight: 500,
      color: 'var(--neutral-600)'
    }
  }, project.bids)), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      color: 'var(--neutral-400)',
      fontSize: 12,
      marginBottom: 2
    }
  }, "Average bid"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 18,
      fontWeight: 500,
      color: 'var(--neutral-600)'
    }
  }, project.avg)))), /*#__PURE__*/React.createElement("div", {
    className: "card",
    style: {
      padding: 24
    }
  }, placed ? /*#__PURE__*/React.createElement("div", {
    style: {
      textAlign: 'center',
      padding: '12px 0'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: 48,
      height: 48,
      borderRadius: '50%',
      background: 'var(--green-200)',
      color: 'var(--green-500)',
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      marginBottom: 12
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "check",
    size: 28
  })), /*#__PURE__*/React.createElement("h3", {
    style: {
      fontSize: 18,
      fontWeight: 500,
      color: 'var(--neutral-600)',
      margin: '0 0 6px'
    }
  }, "Bid placed!"), /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: 13,
      color: 'var(--neutral-500)',
      margin: '0 0 16px'
    }
  }, "Your bid of $", amount, " is now visible to the client."), /*#__PURE__*/React.createElement("button", {
    onClick: () => setPlaced(false),
    className: "btn btn--secondary btn--sm"
  }, "Place another")) : /*#__PURE__*/React.createElement("form", {
    onSubmit: e => {
      e.preventDefault();
      setPlaced(true);
    }
  }, /*#__PURE__*/React.createElement("h3", {
    style: {
      fontSize: 18,
      fontWeight: 500,
      color: 'var(--neutral-600)',
      margin: '0 0 16px'
    }
  }, "Place your bid"), /*#__PURE__*/React.createElement("label", {
    style: {
      display: 'block',
      fontSize: 13,
      fontWeight: 500,
      color: 'var(--neutral-600)',
      marginBottom: 6
    }
  }, "Bid amount (USD)"), /*#__PURE__*/React.createElement("input", {
    className: "input",
    type: "number",
    placeholder: "450",
    value: amount,
    onChange: e => setAmount(e.target.value),
    required: true,
    style: {
      marginBottom: 14
    }
  }), /*#__PURE__*/React.createElement("label", {
    style: {
      display: 'block',
      fontSize: 13,
      fontWeight: 500,
      color: 'var(--neutral-600)',
      marginBottom: 6
    }
  }, "Delivery (days)"), /*#__PURE__*/React.createElement("input", {
    className: "input",
    type: "number",
    placeholder: "7",
    value: days,
    onChange: e => setDays(e.target.value),
    required: true,
    style: {
      marginBottom: 14
    }
  }), /*#__PURE__*/React.createElement("label", {
    style: {
      display: 'block',
      fontSize: 13,
      fontWeight: 500,
      color: 'var(--neutral-600)',
      marginBottom: 6
    }
  }, "Pitch the client"), /*#__PURE__*/React.createElement("textarea", {
    className: "input",
    rows: 4,
    placeholder: "Brief \u2014 why are you the right freelancer for this?",
    value: pitch,
    onChange: e => setPitch(e.target.value),
    required: true,
    style: {
      height: 'auto',
      padding: '12px 16px',
      resize: 'vertical',
      marginBottom: 16,
      lineHeight: 1.5
    }
  }), /*#__PURE__*/React.createElement("button", {
    type: "submit",
    className: "btn btn--primary",
    style: {
      width: '100%'
    }
  }, "Place bid"), /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: 12,
      color: 'var(--neutral-400)',
      textAlign: 'center',
      margin: '12px 0 0'
    }
  }, "Free with your membership \xB7 No bid credit needed.")))))));
};
window.ProjectDetail = ProjectDetail;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/freelancer/ProjectDetail.jsx", error: String((e && e.message) || e) }); }

// ui_kits/freelancer/SearchHero.jsx
try { (() => {
const SearchHero = ({
  onSearch,
  onPost
}) => {
  const [q, setQ] = React.useState('');
  const categories = ['Logo Design', 'WordPress', 'Mobile App', 'Article Writing', 'Data Entry', 'Photoshop', 'Translation', '3D Modelling'];
  return /*#__PURE__*/React.createElement("section", {
    style: {
      background: 'var(--neutral-100)',
      padding: '72px 0',
      borderBottom: '1px solid var(--neutral-200)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "container",
    style: {
      display: 'grid',
      gridTemplateColumns: '1.1fr 0.9fr',
      gap: 48,
      alignItems: 'center'
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h1", {
    style: {
      fontSize: 56,
      fontWeight: 700,
      lineHeight: 1.1,
      letterSpacing: '-0.015em',
      color: 'var(--neutral-600)',
      margin: '0 0 16px'
    }
  }, "Hire experts.", /*#__PURE__*/React.createElement("br", null), "Get the work done."), /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: 18,
      lineHeight: 1.5,
      color: 'var(--neutral-500)',
      margin: '0 0 32px',
      maxWidth: 520
    }
  }, "From a 30-minute fix to a year-long build \u2014 post a project and get competitive bids from 88M+ professionals worldwide."), /*#__PURE__*/React.createElement("form", {
    onSubmit: e => {
      e.preventDefault();
      onSearch && onSearch(q);
    },
    style: {
      display: 'flex',
      gap: 8,
      marginBottom: 16,
      maxWidth: 560
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative',
      flex: 1
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      position: 'absolute',
      left: 16,
      top: '50%',
      transform: 'translateY(-50%)',
      color: 'var(--neutral-400)',
      pointerEvents: 'none',
      display: 'flex'
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "search",
    size: 20
  })), /*#__PURE__*/React.createElement("input", {
    className: "input input--lg",
    placeholder: "What do you need done?",
    value: q,
    onChange: e => setQ(e.target.value),
    style: {
      paddingLeft: 48
    }
  })), /*#__PURE__*/React.createElement("button", {
    type: "submit",
    className: "btn btn--primary btn--lg"
  }, "Search")), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 24
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 13,
      color: 'var(--neutral-400)',
      marginBottom: 10,
      fontWeight: 500
    }
  }, "Popular:"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexWrap: 'wrap',
      gap: 8
    }
  }, categories.map(c => /*#__PURE__*/React.createElement("button", {
    key: c,
    onClick: () => {
      setQ(c);
      onSearch && onSearch(c);
    },
    style: {
      background: '#fff',
      border: '1px solid var(--neutral-300)',
      borderRadius: 9999,
      padding: '6px 14px',
      fontSize: 13,
      color: 'var(--neutral-500)',
      cursor: 'pointer',
      fontFamily: 'inherit'
    }
  }, c)))), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 40,
      display: 'flex',
      gap: 32,
      color: 'var(--neutral-500)',
      fontSize: 14
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("strong", {
    style: {
      color: 'var(--neutral-600)',
      fontSize: 16
    }
  }, "88M+"), "\xA0 professionals"), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("strong", {
    style: {
      color: 'var(--neutral-600)',
      fontSize: 16
    }
  }, "2,700+"), "\xA0 skills"), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("strong", {
    style: {
      color: 'var(--neutral-600)',
      fontSize: 16
    }
  }, "60s"), "\xA0 avg bid time"))), /*#__PURE__*/React.createElement(HeroVisual, null)));
};
const HeroVisual = () => /*#__PURE__*/React.createElement("div", {
  style: {
    position: 'relative',
    height: 440
  }
}, /*#__PURE__*/React.createElement("div", {
  style: {
    position: 'absolute',
    inset: 0,
    backgroundImage: 'url(https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=900&auto=format&fit=crop&q=80)',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    borderRadius: 12,
    border: '1px solid var(--neutral-300)'
  }
}), /*#__PURE__*/React.createElement("div", {
  style: {
    position: 'absolute',
    top: 28,
    left: -32,
    background: '#fff',
    border: '1px solid var(--neutral-300)',
    borderRadius: 12,
    boxShadow: 'var(--shadow-md)',
    padding: 14,
    width: 220,
    display: 'flex',
    alignItems: 'center',
    gap: 12
  }
}, /*#__PURE__*/React.createElement("div", {
  className: "avatar",
  style: {
    width: 40,
    height: 40,
    fontSize: 13,
    background: 'linear-gradient(135deg, var(--blue-400), var(--blue-700))'
  }
}, "JK"), /*#__PURE__*/React.createElement("div", {
  style: {
    flex: 1,
    minWidth: 0
  }
}, /*#__PURE__*/React.createElement("div", {
  style: {
    fontSize: 13,
    fontWeight: 500,
    color: 'var(--neutral-600)'
  }
}, "Project awarded"), /*#__PURE__*/React.createElement("div", {
  style: {
    fontSize: 12,
    color: 'var(--neutral-400)'
  }
}, "Logo & brand identity")), /*#__PURE__*/React.createElement("span", {
  className: "pill pill--success"
}, "Live")), /*#__PURE__*/React.createElement("div", {
  style: {
    position: 'absolute',
    bottom: 32,
    right: -24,
    background: '#fff',
    border: '1px solid var(--neutral-300)',
    borderRadius: 12,
    boxShadow: 'var(--shadow-md)',
    padding: 16,
    width: 240
  }
}, /*#__PURE__*/React.createElement("div", {
  style: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 8
  }
}, /*#__PURE__*/React.createElement("div", {
  style: {
    fontSize: 12,
    color: 'var(--neutral-400)',
    fontWeight: 500
  }
}, "NEW BID"), /*#__PURE__*/React.createElement("span", {
  className: "badge-preferred"
}, "PREFERRED")), /*#__PURE__*/React.createElement("div", {
  style: {
    fontSize: 15,
    fontWeight: 500,
    color: 'var(--neutral-600)',
    marginBottom: 4
  }
}, "$840 \xB7 5 days"), /*#__PURE__*/React.createElement("div", {
  style: {
    display: 'flex',
    alignItems: 'center',
    gap: 6,
    fontSize: 12,
    color: 'var(--neutral-500)'
  }
}, /*#__PURE__*/React.createElement("span", {
  className: "stars stars--sm"
}, "\u2605\u2605\u2605\u2605\u2605"), " 4.9 \xB7 287 reviews")), /*#__PURE__*/React.createElement("div", {
  style: {
    position: 'absolute',
    bottom: -16,
    left: 64,
    background: '#fff',
    border: '1px solid var(--neutral-300)',
    borderRadius: 9999,
    boxShadow: 'var(--shadow-md)',
    padding: '10px 18px',
    display: 'flex',
    alignItems: 'center',
    gap: 10,
    fontSize: 13,
    color: 'var(--neutral-600)',
    fontWeight: 500
  }
}, /*#__PURE__*/React.createElement("span", {
  style: {
    width: 8,
    height: 8,
    borderRadius: '50%',
    background: 'var(--green-400)'
  }
}), "12,341 jobs live now"));
window.SearchHero = SearchHero;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/freelancer/SearchHero.jsx", error: String((e && e.message) || e) }); }

// ui_kits/freelancer/data.jsx
try { (() => {
// Data fixtures for the click-through prototype
const PROJECTS = [{
  id: 'p1',
  title: 'Build a modern React dashboard with charting library',
  desc: 'I need a clean, fast admin dashboard built in React with Recharts/D3 for real-time data viz. Existing API ready; figma provided. Looking for someone with strong typography sense and component-architecture experience.',
  tags: ['React', 'TypeScript', 'D3.js', 'Tailwind', 'API Integration'],
  budget: '$1,500 – $3,000',
  type: 'Fixed price',
  bids: 47,
  avg: '$2,180',
  posted: '23 minutes ago',
  country: 'United States',
  sealed: true,
  featured: true
}, {
  id: 'p2',
  title: 'Logo and full brand identity for sustainable coffee startup',
  desc: 'Need a modern, warm, hand-crafted feeling logo + brand guidelines, color palette, type spec, and primary mark variants. Print + digital deliverables.',
  tags: ['Logo Design', 'Branding', 'Adobe Illustrator', 'Print Design'],
  budget: '$450 – $750',
  type: 'Fixed price',
  bids: 89,
  avg: '$612',
  posted: '1 hour ago',
  country: 'Australia',
  sealed: false,
  featured: false
}, {
  id: 'p3',
  title: 'WordPress site migration from old host with custom theme tweaks',
  desc: 'Moving an existing WordPress site to a new managed host. Need DB transfer, DNS cutover, child theme updates, and a basic speed pass with caching.',
  tags: ['WordPress', 'PHP', 'MySQL', 'Web Hosting'],
  budget: '$250 – $500',
  type: 'Fixed price',
  bids: 32,
  avg: '$340',
  posted: '3 hours ago',
  country: 'United Kingdom',
  sealed: false,
  featured: false
}, {
  id: 'p4',
  title: 'iOS app — fitness tracker with HealthKit integration',
  desc: 'Native Swift/SwiftUI build, integrating Apple HealthKit, offline-first, designed for daily-use simplicity. 12-week timeline with weekly milestones.',
  tags: ['Swift', 'SwiftUI', 'iOS', 'HealthKit', 'Mobile Design'],
  budget: '$3,000+',
  type: 'Fixed price',
  bids: 18,
  avg: '$4,800',
  posted: '5 hours ago',
  country: 'Canada',
  sealed: true,
  featured: true
}, {
  id: 'p5',
  title: 'Translate marketing site into Japanese and Korean',
  desc: 'About 8,000 words across 12 pages. Need native-level fluency, cultural localization (not literal), and on-brand voice maintenance. Source files in Webflow.',
  tags: ['Translation', 'Japanese', 'Korean', 'Localization', 'Copywriting'],
  budget: '$15 – $25 / hr',
  type: 'Hourly',
  bids: 24,
  avg: '$22/hr',
  posted: '8 hours ago',
  country: 'Singapore',
  sealed: false,
  featured: false
}, {
  id: 'p6',
  title: '3D product render — drinkware lineup for e-commerce',
  desc: 'Photoreal renders of 6 SKUs in 3 angles each, plus 2 lifestyle scenes. Reference images and CAD provided. Studio + lifestyle lighting.',
  tags: ['3D Rendering', 'Cinema 4D', 'KeyShot', 'Product Photography'],
  budget: '$800 – $1,200',
  type: 'Fixed price',
  bids: 41,
  avg: '$960',
  posted: '12 hours ago',
  country: 'Germany',
  sealed: false,
  featured: false
}];
const FREELANCERS = [{
  name: 'Maria Rodriguez',
  initials: 'MR',
  title: 'Senior Brand Designer · 8 years',
  rating: '4.9',
  reviews: 287,
  country: 'Spain',
  tagline: 'Helping startups build distinctive brand identities. Specializing in food, hospitality, and lifestyle sectors.',
  skills: ['Logo Design', 'Branding', 'Illustrator', 'Print'],
  rate: '$45',
  preferred: true,
  bg: 'linear-gradient(135deg, var(--orange-300), var(--orange-600))'
}, {
  name: 'David Chen',
  initials: 'DC',
  title: 'Full-Stack Engineer · React + Node',
  rating: '5.0',
  reviews: 412,
  country: 'Taiwan',
  tagline: 'Building production React/Node apps. Fast turnaround, clean code, excellent communication. AWS certified.',
  skills: ['React', 'Node.js', 'TypeScript', 'AWS', 'PostgreSQL'],
  rate: '$60',
  preferred: true,
  bg: 'linear-gradient(135deg, var(--blue-400), var(--blue-700))'
}, {
  name: 'Aisha Khan',
  initials: 'AK',
  title: 'UX/UI Designer & Webflow Developer',
  rating: '4.8',
  reviews: 156,
  country: 'Pakistan',
  tagline: 'I design and build marketing websites that convert. From research to launch — Figma, Webflow, Framer.',
  skills: ['UI Design', 'Webflow', 'Figma', 'Copywriting'],
  rate: '$38',
  preferred: false,
  bg: 'linear-gradient(135deg, var(--purple-300), var(--purple-500))'
}];
window.PROJECTS = PROJECTS;
window.FREELANCERS = FREELANCERS;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/freelancer/data.jsx", error: String((e && e.message) || e) }); }

})();
