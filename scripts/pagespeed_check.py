#!/usr/bin/env python3
"""
Consulta PageSpeed Insights API y extrae métricas Core Web Vitals.
Uso: python pagespeed_check.py [URL] [mobile|desktop]
"""
import sys, os, json, urllib.request, urllib.parse

def consultar_psi(url: str, strategy: str = 'mobile') -> dict:
    """Consulta la API de PageSpeed Insights v5."""
    api_key = os.getenv('PAGESPEED_API_KEY') or os.getenv('GOOGLE_API_KEY')
    if not api_key:
        raise ValueError("Falta PAGESPEED_API_KEY o GOOGLE_API_KEY en el entorno")
    
    params = urllib.parse.urlencode({
        'url': url,
        'strategy': strategy,  # 'mobile' o 'desktop'
        'category': 'performance',
        'key': api_key
    })
    
    endpoint = f'https://www.googleapis.com/pagespeedonline/v5/runPagespeed?{params}'
    req = urllib.request.Request(endpoint, headers={'Accept': 'application/json'})
    
    with urllib.request.urlopen(req, timeout=90) as resp:
        return json.loads(resp.read())

def extraer_metricas(data: dict) -> dict:
    """Extrae las métricas clave del JSON de PSI."""
    try:
        lh = data['lighthouseResult']
        audits = lh['audits']
        cats = lh['categories']['performance']
        
        # Core Web Vitals
        cwv = {
            'score': cats['score'],  # 0.0-1.0
            'lcp': audits['largest-contentful-paint']['displayValue'],
            'fid': audits.get('max-potential-fid', {}).get('displayValue', 'N/A'),
            'cls': audits['cumulative-layout-shift']['displayValue'],
            'fcp': audits['first-contentful-paint']['displayValue'],
            'si': audits['speed-index']['displayValue'],
            'tti': audits['interactive']['displayValue'],
            'tbt': audits['total-blocking-time']['displayValue'],
        }
        
        # Oportunidades principales (ahorro en ms)
        opps = []
        for key in ['render-blocking-resources', 'unused-javascript', 'unused-css-rules', 
                    'uses-optimized-images', 'modern-image-formats', 'offscreen-images']:
            if key in audits and audits[key].get('score', 1) < 1:
                savings = audits[key].get('details', {}).get('overallSavingsMs', 0)
                if savings > 100:
                    opps.append({
                        'audit': audits[key]['title'],
                        'savings_ms': savings
                    })
        
        cwv['opportunities'] = sorted(opps, key=lambda x: x['savings_ms'], reverse=True)
        return cwv
    except KeyError as e:
        raise ValueError(f"Estructura inesperada en la respuesta de PSI: {e}")

if __name__ == '__main__':
    url = sys.argv[1] if len(sys.argv) > 1 else 'https://illasatlanticasatico.es/'
    strategy = sys.argv[2] if len(sys.argv) > 2 else 'mobile'
    
    print(f"Consultando PageSpeed Insights: {url} ({strategy})...")
    data = consultar_psi(url, strategy)
    metricas = extraer_metricas(data)
    
    print(f"\n{'='*60}")
    print(f"Performance Score: {int(metricas['score']*100)}/100")
    print(f"{'='*60}")
    print(f"LCP (Largest Contentful Paint): {metricas['lcp']}")
    print(f"FID (First Input Delay):        {metricas['fid']}")
    print(f"CLS (Cumulative Layout Shift):  {metricas['cls']}")
    print(f"FCP (First Contentful Paint):   {metricas['fcp']}")
    print(f"Speed Index:                    {metricas['si']}")
    print(f"Time to Interactive:            {metricas['tti']}")
    print(f"Total Blocking Time:            {metricas['tbt']}")
    
    if metricas['opportunities']:
        print(f"\n{'='*60}")
        print("Oportunidades (ahorro >100 ms):")
        print(f"{'='*60}")
        for opp in metricas['opportunities']:
            print(f"  {opp['audit']}: {opp['savings_ms']} ms")
    
    # Guardar JSON completo
    out_path = f"/root/illas-atlanticas-web/psi_{strategy}.json"
    with open(out_path, 'w') as f:
        json.dump(data, f, indent=2)
    print(f"\nJSON completo guardado en {out_path}")
