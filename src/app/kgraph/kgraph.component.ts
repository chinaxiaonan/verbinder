import { Component, OnInit } from '@angular/core';
import { CommunicationService } from '../communication.service';
import * as d3 from 'd3';

@Component({
    selector: 'app-kgraph',
    templateUrl: './kgraph.component.html',
    styleUrls: ['./kgraph.component.css']
})
export class KgraphComponent implements OnInit {
    nodes: Array<string>;
    links: Array<string>;
    datas: any;
    simulation: any;

    constructor(private comm: CommunicationService) { }

    ngOnInit() {
        this.nodes = [];
        this.links = [];
        this.datas = this.comm.getDatas();
    }

    ngAfterViewInit() {
        this.drawGraph();
    }

    drawGraph() {
        const svg = d3.select('svg').attr('width', window.innerWidth).attr('height', window.innerHeight).call(d3.zoom().scaleExtent([0.2, 3]).on('zoom', () => {
            d3.zoomTransform(d3.selectAll());
        }));
        console.log(svg);

        this.simulation = d3.forceSimulation()
            //.force('link', d3.forceLink().id(d=>d.id).distance(180))
            .force('charge_force', d3.forceManyBody().strength(-1000))
            .force('center_force', d3.forceCenter(window.innerWidth / 2, window.innerHeight / 2));
        //.on("tick", this.ticked);
        const resp = this.fillData();
        this.nodes = resp.nodes;
        this.links = resp.links;

        this.simulation.nodes(this.nodes);

        const linkforce = d3.forceLink(this.links).distance(180);
        this.simulation.force('link', linkforce);
        const drawedLinks = this.drawLinks(this.links);
        const drawedNodes = this.drawNodes(this.nodes);
        const drawedLinkTexts = this.drawLinkText(this.links);
        const drawedCircleTexts = this.drawCircleText(this.nodes);
        this.simulation.on('tick', this.ticked.bind(this, drawedLinks, drawedNodes, drawedLinkTexts, drawedCircleTexts));

    }

    fillData() {
        var temp_nodes = [];
        var temp_links = [];
        var temp = {};
        this.datas.forEach(function (data) {
            if (!temp[data.source]) {
                temp_nodes.push({
                    name: data.source
                });
                temp[data.source] = 1;
            }
            if (!temp[data.target]) {
                temp_nodes.push({
                    name: data.target
                });
                temp[data.target] = 1;
            }
        });
        this.simulation.nodes(temp_nodes);
        temp = {};
        temp_nodes.forEach(function (node) {
            temp[node.name] = node.index;
        });
        this.datas.forEach(function (data) {
            temp_links.push({
                source: temp[data.source],
                target: temp[data.target],
                rela: data.rela
            })
        });
        //simulation.force('link', d3.forceLink(links).distance(180));
        return { nodes: temp_nodes, links: temp_links }

    }

    drawLinks(links) {
        return d3.select('svg').append('g').selectAll('.link').data(links).enter().append('path').attr("class", "link")
            .attr("id", function (d, i) {
                return 'linkpath' + i;
            })
            .attr("d", function (d) {
                return 'M ' + d.source.x + ' ' + d.source.y + ' L ' + d.target.x + ' ' + d.target.y;
            });
    }

    drawLinkText(links) {
        const linklabels = d3.select('svg').append("g").selectAll(".linklabel").data(links).enter().append("text").attr("class",
            "linklabel").attr("dx", 80)
            .attr("dy", 0).attr("id", function (d, i) {
                return 'linkpath' + i;
            });
        linklabels.append(
            'textPath').text(function (d) {
                return d.rela;
            }).attr('xlink:href', function (d, i) {
                return '#linkpath' + i
            });
        return linklabels;
    }

    drawCircleText(nodes) {
        return d3.select('svg').append("g").selectAll("circletext").data(nodes).enter().append("text").attr("dy", ".35em")
            .attr("text-anchor", "middle").attr("x", function (d) {
                if (d.name.length <= 4) {
                    d3.select(this).append('tspan')
                        .attr('x', 0)
                        .attr('y', 2)
                        .text(function () {
                            return d.name;
                        });
                } else {
                    var top = d.name.substring(0, 4);
                    var bot = d.name.substring(4, d.name.length);
                    d3.select(this).text(function () {
                        return '';
                    });
                    d3.select(this).append('tspan')
                        .attr('x', 0)
                        .attr('y', -7)
                        .text(function () {
                            return top;
                        });
                    d3.select(this).append('tspan')
                        .attr('x', 0)
                        .attr('y', 10)
                        .text(function () {
                            return bot;
                        });
                }
            });
    }

    drawNodes(nodes) {
        //const svg = this.state.svg;
        return d3.select('svg').append("g").selectAll("circle").data(nodes).enter().append("circle").attr("r", 30).attr("class",
            "circle").call(d3.drag().on("start", this.dragstart.bind(this))
                .on("drag", this.dragmove.bind(this))
                .on("end", this.dragend.bind(this)));
    }
    ticked(drawedLinks, drawedNodes, drawedLinkTexts, drawedCircleTexts) {
        drawedLinks.attr("d", function (d) {
            return 'M ' + d.source.x + ' ' + d.source.y + ' L ' + d.target.x + ' ' + d.target.y;
        })
        drawedNodes.attr("transform", this.transform);
        drawedCircleTexts.attr("transform", this.transform);
        drawedLinkTexts.attr('transform', function (d, i) {
            if (d.target.x < d.source.x) {
                const bbox = this.getBBox();
                const rx = bbox.x + bbox.width / 2;
                const ry = bbox.y + bbox.height / 2;
                return 'rotate(180 ' + rx + ' ' + ry + ')';
            } else {
                return 'rotate(0)';
            }
        });
    }

    transform(d) {
        return "translate(" + d.x + "," + d.y + ")";
    }

    transform2(d) {
        return "translate(" + (d.x) + "," + d.y + ")";
    }

    dragstart() {
        if (!d3.event.active) this.simulation.alphaTarget(0.3).restart();
        d3.event.subject.fx = d3.event.subject.x;
        d3.event.subject.fy = d3.event.subject.y;
    }
    dragmove() {
        d3.event.subject.fx = d3.event.x;
        d3.event.subject.fy = d3.event.y;
    }
    dragend() {
        if (!d3.event.active) this.simulation.alphaTarget(0);
        d3.event.subject.fx = null;
        d3.event.subject.fy = null;
    }

}
