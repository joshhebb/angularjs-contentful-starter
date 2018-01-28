var gulp = require("gulp"),
	dateformat = require("dateformat"),
	sync = require("gulp-sync")(gulp),
	rename = require("gulp-rename"),
	header = require("gulp-header"),
	templatecache = require("gulp-angular-templatecache"),
	usemin = require("gulp-usemin"),
	uglify = require("gulp-uglify"),
	minifyCss = require("gulp-minify-css"),
	minifyHtml = require("gulp-minify-html"),
	replace = require("gulp-replace"),
	run = require("gulp-run"),
	connect = require("gulp-connect");

var pkg = require("./package.json"),

	// index page path
	root = ".",

	// list all pages
	pages = [
		"index"
	];

var banner = [
		"/* " + pkg.name + " v" + pkg.version + " " + dateformat(new Date(), "yyyy-mm-dd"),
		" * " + pkg.homepage,
		" * License: " + pkg.license,
		" */\n\n"
	].join("\n"),
	paths = {
		"tmpl": [root+"/src/**/*.html"],
		"js": ["!**/*.tmp.js", "!**/*.test.js", "!"+root+"/src/**/*.min.js", root+"/src/**/*.js"],
		"css": ["!"+root+"/src/**/*.min.css", root+"/src/**/*.css"]
	},
	ngModule = pkg.name;

// generate path of pages
pages.forEach(function(page) {
	var name = page + ".src.html";
	paths[name] = paths[name] || [];
	paths[name].push(root + "/" + name);

	name = page + ".html";
	paths[name] = paths[name] || [];
	paths[name].push(root + "/" + name);
});

gulp.task("build", sync.sync([
	// stage 1: build resource
	["css", "js", "tmpl", "bower.json"],

	// stage 2: build pages sources
	pages.map(function(page) { return page + ".src.html"; }),

	// stage 3: build release pages
	pages.map(function(page) { return page + ".html"; })
]));

gulp.task("default", sync.sync([
	["build"],
	["watch"]
]));

gulp.task("dev", ["watch"]);

gulp.task("up", ["update-npm", "update-bower"]);

gulp.task("css", function(done) {
	gulp.src(paths.css)
		.pipe(connect.reload())
		.on("end", done);
});

gulp.task("js", function(done) {
	gulp.src(paths.js)
		.pipe(connect.reload())
		.on("end", done);
});

gulp.task("tmpl", function(done) {
	gulp.src(paths.tmpl)
		.pipe(templatecache("angular-template.tmp.js", {
			module: ngModule,
			root: "src"
		}))
		.pipe(gulp.dest(root+"/src/"))
		.pipe(connect.reload())
		.on("end", done);
});

// generate task of pages
pages.forEach(function(page) {
	(function(page) {
		var name = page + ".src.html";
		gulp.task(name, function(done) {
			gulp.src(paths[name])
				.pipe(rename({ basename: page }))
				.pipe(gulp.dest(root))
				.pipe(connect.reload())
				.on("end", done);
		});
	})(page);

	(function(page) {
		var name = page + ".html";
		gulp.task(name, function(done) {
			gulp.src(paths[name])
				.pipe(usemin({
					css: [
						minifyCss(),
						header(banner)
					],
					js: [
						replace(/\.version = \"0\";/, ".version = \"" + pkg.version + "\""),
						uglify(),
						header(banner)
					],
					html: [
						minifyHtml({ empty: true })
					],
					enableHtmlComment: true
				}))
				.pipe(gulp.dest(root))
				.pipe(connect.reload())
				.on("end", done);
		});
	})(page);
});

gulp.task("bower.json", function(done) {
	gulp.src(["bower.json"])
		.pipe(replace(/"name": "[^"]*"/, "\"name\": \"" + pkg.name + "\""))
		.pipe(gulp.dest("./"))
		.on("end", done);
});

gulp.task("update-npm", function(done) {
	var cmd = "sh -c './node_modules/npm-check-updates/bin/npm-check-updates -u'";
	run(cmd).exec().on("end", done);
});

gulp.task("update-bower", function(done) {
	var bowerjson = require("./bower.json");
	var deps = [];
	var i, cmd;

	for (i in bowerjson.dependencies) {
		deps.push(i);
	}
	cmd = "bower install --save --force-latest " + deps.join(" ");
	run(cmd).exec().on("end", done);
});

gulp.task("watch", function() {
	["tmpl", "css", "js"]
		.concat(pages.map(function(page) { return page + ".src.html"; }))
		.forEach(function(i) {
			gulp.watch(paths[i], function(i) {
				return function() {
					gulp.src(paths[i])
						.pipe(connect.reload());
				};
			}(i));
		});

	connect.server({
		root: root,
		port: 9000,
		livereload: true
	});
});
