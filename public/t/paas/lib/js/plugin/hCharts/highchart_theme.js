var theme = {
  darkblue: {
    name: '深蓝',
    className: 'bg-color-blueDark',
    colors: ["#DDDF0D", "#55BF3B", "#DF5353", "#7798BF", "#aaeeee", "#ff0066", "#eeaaee", "#55BF3B", "#DF5353", "#7798BF", "#aaeeee"],
    chart: {
      backgroundColor: {
        linearGradient: {
          x1: 0,
          y1: 0,
          x2: 1,
          y2: 1
        },
        stops: [[0, 'rgb(48, 48, 96)'], [1, 'rgb(0, 0, 0)']]
      },
      borderColor: '#000000',
      borderWidth: 2,
      className: 'dark-container',
      plotBackgroundColor: 'rgba(255, 255, 255, .1)',
      plotBorderColor: '#CCCCCC',
      plotBorderWidth: 1
    },
    title: {
      style: {
        color: '#C0C0C0',
        font: 'bold 16px "Trebuchet MS", Verdana, sans-serif'
      }
    },
    subtitle: {
      style: {
        color: '#666666',
        font: 'bold 12px "Trebuchet MS", Verdana, sans-serif'
      }
    },
    xAxis: {
      gridLineColor: '#333333',
      gridLineWidth: 1,
      labels: {
        style: {
          color: '#A0A0A0'
        }
      },
      lineColor: '#A0A0A0',
      tickColor: '#A0A0A0',
      title: {
        style: {
          color: '#CCC',
          fontWeight: 'bold',
          fontSize: '12px',
          fontFamily: 'Trebuchet MS, Verdana, sans-serif'

        }
      }
    },
    yAxis: {
      gridLineColor: '#333333',
      labels: {
        style: {
          color: '#A0A0A0'
        }
      },
      lineColor: '#A0A0A0',
      minorTickInterval: null,
      tickColor: '#A0A0A0',
      tickWidth: 1,
      title: {
        style: {
          color: '#CCC',
          fontWeight: 'bold',
          fontSize: '12px',
          fontFamily: 'Trebuchet MS, Verdana, sans-serif'
        }
      }
    },
    tooltip: {
      backgroundColor: 'rgba(0, 0, 0, 0.75)',
      style: {
        color: '#F0F0F0'
      }
    },
    toolbar: {
      itemStyle: {
        color: 'silver'
      }
    },
    plotOptions: {
      line: {
        dataLabels: {
          color: '#CCC'
        },
        marker: {
          lineColor: '#333'
        }
      },
      spline: {
        marker: {
          lineColor: '#333'
        }
      },
      scatter: {
        marker: {
          lineColor: '#333'
        }
      },
      candlestick: {
        lineColor: 'white'
      }
    },
    legend: {
      itemStyle: {
        font: '9pt Trebuchet MS, Verdana, sans-serif',
        color: '#A0A0A0'
      },
      itemHoverStyle: {
        color: '#FFF'
      },
      itemHiddenStyle: {
        color: '#444'
      }
    },
    credits: {
      style: {
        color: '#666'
      }
    },
    labels: {
      style: {
        color: '#CCC'
      }
    },

    navigation: {
      buttonOptions: {
        symbolStroke: '#DDDDDD',
        hoverSymbolStroke: '#FFFFFF',
        theme: {
          fill: {
            linearGradient: {
              x1: 0,
              y1: 0,
              x2: 0,
              y2: 1
            },
            stops: [[0.4, '#606060'], [0.6, '#333333']]
          },
          stroke: '#000000'
        }
      }
    },

    // scroll charts
    rangeSelector: {
      buttonTheme: {
        fill: {
          linearGradient: {
            x1: 0,
            y1: 0,
            x2: 0,
            y2: 1
          },
          stops: [[0.4, '#888'], [0.6, '#555']]
        },
        stroke: '#000000',
        style: {
          color: '#CCC',
          fontWeight: 'bold'
        },
        states: {
          hover: {
            fill: {
              linearGradient: {
                x1: 0,
                y1: 0,
                x2: 0,
                y2: 1
              },
              stops: [[0.4, '#BBB'], [0.6, '#888']]
            },
            stroke: '#000000',
            style: {
              color: 'white'
            }
          },
          select: {
            fill: {
              linearGradient: {
                x1: 0,
                y1: 0,
                x2: 0,
                y2: 1
              },
              stops: [[0.1, '#000'], [0.3, '#333']]
            },
            stroke: '#000000',
            style: {
              color: 'yellow'
            }
          }
        }
      },
      inputStyle: {
        backgroundColor: '#333',
        color: 'silver'
      },
      labelStyle: {
        color: 'silver'
      }
    },

    navigator: {
      handles: {
        backgroundColor: '#666',
        borderColor: '#AAA'
      },
      outlineColor: '#CCC',
      maskFill: 'rgba(16, 16, 16, 0.5)',
      series: {
        color: '#7798BF',
        lineColor: '#A6C7ED'
      }
    },

    scrollbar: {
      barBackgroundColor: {
        linearGradient: {
          x1: 0,
          y1: 0,
          x2: 0,
          y2: 1
        },
        stops: [[0.4, '#888'], [0.6, '#555']]
      },
      barBorderColor: '#CCC',
      buttonArrowColor: '#CCC',
      buttonBackgroundColor: {
        linearGradient: {
          x1: 0,
          y1: 0,
          x2: 0,
          y2: 1
        },
        stops: [[0.4, '#888'], [0.6, '#555']]
      },
      buttonBorderColor: '#CCC',
      rifleColor: '#FFF',
      trackBackgroundColor: {
        linearGradient: {
          x1: 0,
          y1: 0,
          x2: 0,
          y2: 1
        },
        stops: [[0, '#000'], [1, '#333']]
      },
      trackBorderColor: '#666'
    },

    // special colors for some of the
    legendBackgroundColor: 'rgba(0, 0, 0, 0.5)',
    legendBackgroundColorSolid: 'rgb(35, 35, 70)',
    dataLabelsColor: '#444',
    textColor: '#C0C0C0',
    maskColor: 'rgba(255,255,255,0.3)'
  },
  darkgreen: {
    name: '深绿',
    className: 'bg-color-greenDark',
    colors: ["#DDDF0D", "#55BF3B", "#DF5353", "#7798BF", "#aaeeee", "#ff0066", "#eeaaee", "#55BF3B", "#DF5353", "#7798BF", "#aaeeee"],
    chart: {
      backgroundColor: {
        linearGradient: [0, 0, 250, 500],
        stops: [[0, 'rgb(48, 96, 48)'], [1, 'rgb(0, 0, 0)']]
      },
      borderColor: '#000000',
      borderWidth: 2,
      className: 'dark-container',
      plotBackgroundColor: 'rgba(255, 255, 255, .1)',
      plotBorderColor: '#CCCCCC',
      plotBorderWidth: 1
    },
    title: {
      style: {
        color: '#C0C0C0',
        font: 'bold 16px "Trebuchet MS", Verdana, sans-serif'
      }
    },
    subtitle: {
      style: {
        color: '#666666',
        font: 'bold 12px "Trebuchet MS", Verdana, sans-serif'
      }
    },
    xAxis: {
      gridLineColor: '#333333',
      gridLineWidth: 1,
      labels: {
        style: {
          color: '#A0A0A0'
        }
      },
      lineColor: '#A0A0A0',
      tickColor: '#A0A0A0',
      title: {
        style: {
          color: '#CCC',
          fontWeight: 'bold',
          fontSize: '12px',
          fontFamily: 'Trebuchet MS, Verdana, sans-serif'

        }
      }
    },
    yAxis: {
      gridLineColor: '#333333',
      labels: {
        style: {
          color: '#A0A0A0'
        }
      },
      lineColor: '#A0A0A0',
      minorTickInterval: null,
      tickColor: '#A0A0A0',
      tickWidth: 1,
      title: {
        style: {
          color: '#CCC',
          fontWeight: 'bold',
          fontSize: '12px',
          fontFamily: 'Trebuchet MS, Verdana, sans-serif'
        }
      }
    },
    tooltip: {
      backgroundColor: 'rgba(0, 0, 0, 0.75)',
      style: {
        color: '#F0F0F0'
      }
    },
    toolbar: {
      itemStyle: {
        color: 'silver'
      }
    },
    plotOptions: {
      line: {
        dataLabels: {
          color: '#CCC'
        },
        marker: {
          lineColor: '#333'
        }
      },
      spline: {
        marker: {
          lineColor: '#333'
        }
      },
      scatter: {
        marker: {
          lineColor: '#333'
        }
      },
      candlestick: {
        lineColor: 'white'
      }
    },
    legend: {
      itemStyle: {
        font: '9pt Trebuchet MS, Verdana, sans-serif',
        color: '#A0A0A0'
      },
      itemHoverStyle: {
        color: '#FFF'
      },
      itemHiddenStyle: {
        color: '#444'
      }
    },
    credits: {
      style: {
        color: '#666'
      }
    },
    labels: {
      style: {
        color: '#CCC'
      }
    },

    navigation: {
      buttonOptions: {
        symbolStroke: '#DDDDDD',
        hoverSymbolStroke: '#FFFFFF',
        theme: {
          fill: {
            linearGradient: {
              x1: 0,
              y1: 0,
              x2: 0,
              y2: 1
            },
            stops: [[0.4, '#606060'], [0.6, '#333333']]
          },
          stroke: '#000000'
        }
      }
    },

    // scroll charts
    rangeSelector: {
      buttonTheme: {
        fill: {
          linearGradient: {
            x1: 0,
            y1: 0,
            x2: 0,
            y2: 1
          },
          stops: [[0.4, '#888'], [0.6, '#555']]
        },
        stroke: '#000000',
        style: {
          color: '#CCC',
          fontWeight: 'bold'
        },
        states: {
          hover: {
            fill: {
              linearGradient: {
                x1: 0,
                y1: 0,
                x2: 0,
                y2: 1
              },
              stops: [[0.4, '#BBB'], [0.6, '#888']]
            },
            stroke: '#000000',
            style: {
              color: 'white'
            }
          },
          select: {
            fill: {
              linearGradient: {
                x1: 0,
                y1: 0,
                x2: 0,
                y2: 1
              },
              stops: [[0.1, '#000'], [0.3, '#333']]
            },
            stroke: '#000000',
            style: {
              color: 'yellow'
            }
          }
        }
      },
      inputStyle: {
        backgroundColor: '#333',
        color: 'silver'
      },
      labelStyle: {
        color: 'silver'
      }
    },

    navigator: {
      handles: {
        backgroundColor: '#666',
        borderColor: '#AAA'
      },
      outlineColor: '#CCC',
      maskFill: 'rgba(16, 16, 16, 0.5)',
      series: {
        color: '#7798BF',
        lineColor: '#A6C7ED'
      }
    },

    scrollbar: {
      barBackgroundColor: {
        linearGradient: {
          x1: 0,
          y1: 0,
          x2: 0,
          y2: 1
        },
        stops: [[0.4, '#888'], [0.6, '#555']]
      },
      barBorderColor: '#CCC',
      buttonArrowColor: '#CCC',
      buttonBackgroundColor: {
        linearGradient: {
          x1: 0,
          y1: 0,
          x2: 0,
          y2: 1
        },
        stops: [[0.4, '#888'], [0.6, '#555']]
      },
      buttonBorderColor: '#CCC',
      rifleColor: '#FFF',
      trackBackgroundColor: {
        linearGradient: {
          x1: 0,
          y1: 0,
          x2: 0,
          y2: 1
        },
        stops: [[0, '#000'], [1, '#333']]
      },
      trackBorderColor: '#666'
    },

    // special colors for some of the
    legendBackgroundColor: 'rgba(0, 0, 0, 0.5)',
    legendBackgroundColorSolid: 'rgb(35, 35, 70)',
    dataLabelsColor: '#444',
    textColor: '#C0C0C0',
    maskColor: 'rgba(255,255,255,0.3)'
  },
  gray: {
    name: '灰',
    className: 'bg-color-grayDark',
    colors: ["#DDDF0D", "#7798BF", "#55BF3B", "#DF5353", "#aaeeee", "#ff0066", "#eeaaee", "#55BF3B", "#DF5353", "#7798BF", "#aaeeee"],
    chart: {
      backgroundColor: {
        linearGradient: {
          x1: 0,
          y1: 0,
          x2: 0,
          y2: 1
        },
        stops: [[0, 'rgb(96, 96, 96)'], [1, 'rgb(16, 16, 16)']]
      },
      borderWidth: 0,
      borderRadius: 0,
      plotBackgroundColor: null,
      plotShadow: false,
      plotBorderWidth: 0
    },
    title: {
      style: {
        color: '#FFF',
        font: '16px Lucida Grande, Lucida Sans Unicode, Verdana, Arial, Helvetica, sans-serif'
      }
    },
    subtitle: {
      style: {
        color: '#DDD',
        font: '12px Lucida Grande, Lucida Sans Unicode, Verdana, Arial, Helvetica, sans-serif'
      }
    },
    xAxis: {
      gridLineWidth: 0,
      lineColor: '#999',
      tickColor: '#999',
      labels: {
        style: {
          color: '#999',
          fontWeight: 'bold'
        }
      },
      title: {
        style: {
          color: '#AAA',
          font: 'bold 12px Lucida Grande, Lucida Sans Unicode, Verdana, Arial, Helvetica, sans-serif'
        }
      }
    },
    yAxis: {
      alternateGridColor: null,
      minorTickInterval: null,
      gridLineColor: 'rgba(255, 255, 255, .1)',
      minorGridLineColor: 'rgba(255,255,255,0.07)',
      lineWidth: 0,
      tickWidth: 0,
      labels: {
        style: {
          color: '#999',
          fontWeight: 'bold'
        }
      },
      title: {
        style: {
          color: '#AAA',
          font: 'bold 12px Lucida Grande, Lucida Sans Unicode, Verdana, Arial, Helvetica, sans-serif'
        }
      }
    },
    legend: {
      itemStyle: {
        color: '#CCC'
      },
      itemHoverStyle: {
        color: '#FFF'
      },
      itemHiddenStyle: {
        color: '#333'
      }
    },
    labels: {
      style: {
        color: '#CCC'
      }
    },
    tooltip: {
      backgroundColor: {
        linearGradient: {
          x1: 0,
          y1: 0,
          x2: 0,
          y2: 1
        },
        stops: [[0, 'rgba(96, 96, 96, .8)'], [1, 'rgba(16, 16, 16, .8)']]
      },
      borderWidth: 0,
      style: {
        color: '#FFF'
      }
    },

    plotOptions: {
      series: {
        nullColor: '#444444'
      },
      line: {
        dataLabels: {
          color: '#CCC'
        },
        marker: {
          lineColor: '#333'
        }
      },
      spline: {
        marker: {
          lineColor: '#333'
        }
      },
      scatter: {
        marker: {
          lineColor: '#333'
        }
      },
      candlestick: {
        lineColor: 'white'
      }
    },

    toolbar: {
      itemStyle: {
        color: '#CCC'
      }
    },

    navigation: {
      buttonOptions: {
        symbolStroke: '#DDDDDD',
        hoverSymbolStroke: '#FFFFFF',
        theme: {
          fill: {
            linearGradient: {
              x1: 0,
              y1: 0,
              x2: 0,
              y2: 1
            },
            stops: [[0.4, '#606060'], [0.6, '#333333']]
          },
          stroke: '#000000'
        }
      }
    },

    // scroll charts
    rangeSelector: {
      buttonTheme: {
        fill: {
          linearGradient: {
            x1: 0,
            y1: 0,
            x2: 0,
            y2: 1
          },
          stops: [[0.4, '#888'], [0.6, '#555']]
        },
        stroke: '#000000',
        style: {
          color: '#CCC',
          fontWeight: 'bold'
        },
        states: {
          hover: {
            fill: {
              linearGradient: {
                x1: 0,
                y1: 0,
                x2: 0,
                y2: 1
              },
              stops: [[0.4, '#BBB'], [0.6, '#888']]
            },
            stroke: '#000000',
            style: {
              color: 'white'
            }
          },
          select: {
            fill: {
              linearGradient: {
                x1: 0,
                y1: 0,
                x2: 0,
                y2: 1
              },
              stops: [[0.1, '#000'], [0.3, '#333']]
            },
            stroke: '#000000',
            style: {
              color: 'yellow'
            }
          }
        }
      },
      inputStyle: {
        backgroundColor: '#333',
        color: 'silver'
      },
      labelStyle: {
        color: 'silver'
      }
    },

    navigator: {
      handles: {
        backgroundColor: '#666',
        borderColor: '#AAA'
      },
      outlineColor: '#CCC',
      maskFill: 'rgba(16, 16, 16, 0.5)',
      series: {
        color: '#7798BF',
        lineColor: '#A6C7ED'
      }
    },

    scrollbar: {
      barBackgroundColor: {
        linearGradient: {
          x1: 0,
          y1: 0,
          x2: 0,
          y2: 1
        },
        stops: [[0.4, '#888'], [0.6, '#555']]
      },
      barBorderColor: '#CCC',
      buttonArrowColor: '#CCC',
      buttonBackgroundColor: {
        linearGradient: {
          x1: 0,
          y1: 0,
          x2: 0,
          y2: 1
        },
        stops: [[0.4, '#888'], [0.6, '#555']]
      },
      buttonBorderColor: '#CCC',
      rifleColor: '#FFF',
      trackBackgroundColor: {
        linearGradient: {
          x1: 0,
          y1: 0,
          x2: 0,
          y2: 1
        },
        stops: [[0, '#000'], [1, '#333']]
      },
      trackBorderColor: '#666'
    },

    // special colors for some of the demo examples
    legendBackgroundColor: 'rgba(48, 48, 48, 0.8)',
    legendBackgroundColorSolid: 'rgb(70, 70, 70)',
    dataLabelsColor: '#444',
    textColor: '#E0E0E0',
    maskColor: 'rgba(255,255,255,0.3)'
  },
  grid: {
    name: '网格',
    className: '',
    colors: ['#058DC7', '#50B432', '#ED561B', '#DDDF00', '#24CBE5', '#64E572', '#FF9655', '#FFF263', '#6AF9C4'],
    chart: {
      backgroundColor: {
        linearGradient: {
          x1: 0,
          y1: 0,
          x2: 1,
          y2: 1
        },
        stops: [[0, 'rgb(255, 255, 255)'], [1, 'rgb(240, 240, 255)']]
      },
      borderWidth: 2,
      plotBackgroundColor: 'rgba(255, 255, 255, .9)',
      plotShadow: true,
      plotBorderWidth: 1
    },
    title: {
      style: {
        color: '#000',
        font: 'bold 16px "Trebuchet MS", Verdana, sans-serif'
      }
    },
    subtitle: {
      style: {
        color: '#666666',
        font: 'bold 12px "Trebuchet MS", Verdana, sans-serif'
      }
    },
    xAxis: {
      gridLineWidth: 1,
      lineColor: '#000',
      tickColor: '#000',
      labels: {
        style: {
          color: '#000',
          font: '11px Trebuchet MS, Verdana, sans-serif'
        }
      },
      title: {
        style: {
          color: '#333',
          fontWeight: 'bold',
          fontSize: '12px',
          fontFamily: 'Trebuchet MS, Verdana, sans-serif'

        }
      }
    },
    yAxis: {
      minorTickInterval: 'auto',
      lineColor: '#000',
      lineWidth: 1,
      tickWidth: 1,
      tickColor: '#000',
      labels: {
        style: {
          color: '#000',
          font: '11px Trebuchet MS, Verdana, sans-serif'
        }
      },
      title: {
        style: {
          color: '#333',
          fontWeight: 'bold',
          fontSize: '12px',
          fontFamily: 'Trebuchet MS, Verdana, sans-serif'
        }
      }
    },
    legend: {
      itemStyle: {
        font: '9pt Trebuchet MS, Verdana, sans-serif',
        color: 'black'

      },
      itemHoverStyle: {
        color: '#039'
      },
      itemHiddenStyle: {
        color: 'gray'
      }
    },
    labels: {
      style: {
        color: '#99b'
      }
    },

    navigation: {
      buttonOptions: {
        theme: {
          stroke: '#CCCCCC'
        }
      }
    }
  },
  skies: {
    name: '天空',
    className: 'bg-color-blueLight',
    colors: ["#514F78", "#42A07B", "#9B5E4A", "#72727F", "#1F949A", "#82914E", "#86777F", "#42A07B"],
    chart: {
      className: 'skies',
      borderWidth: 0,
      plotShadow: true,
      plotBackgroundImage: 'http://www.highcharts.com/demo/gfx/skies.jpg',
      plotBackgroundColor: {
        linearGradient: [0, 0, 250, 500],
        stops: [[0, 'rgba(255, 255, 255, 1)'], [1, 'rgba(255, 255, 255, 0)']]
      },
      plotBorderWidth: 1
    },
    title: {
      style: {
        color: '#3E576F',
        font: '16px Lucida Grande, Lucida Sans Unicode, Verdana, Arial, Helvetica, sans-serif'
      }
    },
    subtitle: {
      style: {
        color: '#6D869F',
        font: '12px Lucida Grande, Lucida Sans Unicode, Verdana, Arial, Helvetica, sans-serif'
      }
    },
    xAxis: {
      gridLineWidth: 0,
      lineColor: '#C0D0E0',
      tickColor: '#C0D0E0',
      labels: {
        style: {
          color: '#666',
          fontWeight: 'bold'
        }
      },
      title: {
        style: {
          color: '#666',
          font: '12px Lucida Grande, Lucida Sans Unicode, Verdana, Arial, Helvetica, sans-serif'
        }
      }
    },
    yAxis: {
      alternateGridColor: 'rgba(255, 255, 255, .5)',
      lineColor: '#C0D0E0',
      tickColor: '#C0D0E0',
      tickWidth: 1,
      labels: {
        style: {
          color: '#666',
          fontWeight: 'bold'
        }
      },
      title: {
        style: {
          color: '#666',
          font: '12px Lucida Grande, Lucida Sans Unicode, Verdana, Arial, Helvetica, sans-serif'
        }
      }
    },
    legend: {
      itemStyle: {
        font: '9pt Trebuchet MS, Verdana, sans-serif',
        color: '#3E576F'
      },
      itemHoverStyle: {
        color: 'black'
      },
      itemHiddenStyle: {
        color: 'silver'
      }
    },
    labels: {
      style: {
        color: '#3E576F'
      }
    }
  }
}